'use client'

import ky from 'ky'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Heart } from 'lucide-react'

import { LikeInfo } from '@/lib/prisma'
import { cn } from '@/lib/utils'
import { useToast } from '../ui/use-toast'

type Props = {
  postId: string
  initialState: LikeInfo
}

export default function LikeBtn({ postId, initialState }: Props) {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const queryKey = ['like-info', postId]

  const { data } = useQuery({
    queryKey,
    queryFn: () => ky.get(`/api/posts/${postId}/likes`).json<LikeInfo>(),
    initialData: initialState,
    staleTime: Infinity,
  })

  const { mutate } = useMutation({
    mutationFn: () =>
      data.isLikedByUser
        ? ky.delete(`/api/posts/${postId}/likes`)
        : ky.post(`/api/posts/${postId}/likes`),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey })

      const previousState = queryClient.getQueryData<LikeInfo>(queryKey)

      queryClient.setQueryData<LikeInfo>(queryKey, () => ({
        likes:
          (previousState?.likes || 0) + (previousState?.isLikedByUser ? -1 : 1),
        isLikedByUser: !previousState?.isLikedByUser,
      }))

      return { previousState }
    },

    onError(error, variables, context) {
      queryClient.setQueryData(queryKey, context?.previousState)
      console.error(error)
      toast({
        variant: 'destructive',
        description: 'Something went wrong. Please try again.',
      })
    },
  })

  return (
    <button onClick={() => mutate()} className="flex items-center gap-2">
      <Heart
        className={cn(
          'size-5',
          data.isLikedByUser && 'fill-red-500 text-red-500'
        )}
      />
      <span className="text-sm font-medium tabular-nums">
        {data.likes} <span className="hidden sm:inline">likes</span>
      </span>
    </button>
  )
}
