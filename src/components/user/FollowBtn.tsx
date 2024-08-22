'use client'

import ky from 'ky'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { FollowerInfo } from '@/lib/prisma'
import { useToast } from '../ui/use-toast'
import { Button } from '../ui/button'

type Props = {
  userId: string
  initialState: FollowerInfo
}

export default function FollowBtn({ userId, initialState }: Props) {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const queryKey = ['follower-info', userId]
  const { data } = useQuery({
    queryKey,
    queryFn: () => ky.get(`/api/users/${userId}/follower`).json<FollowerInfo>(),
    initialData: initialState,
    staleTime: Infinity,
  })

  const { mutate } = useMutation({
    mutationFn: () =>
      data.isFollowedByUser ? ky.delete(`/api/users/${userId}/followers`) : ky.post(`/api/users/${userId}/followers`),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey })

      const previousState = queryClient.getQueryData<FollowerInfo>(queryKey)

      queryClient.setQueryData<FollowerInfo>(queryKey, () => ({
        followers: (previousState?.followers || 0) + (previousState?.isFollowedByUser ? -1 : 1),
        isFollowedByUser: !previousState?.isFollowedByUser,
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
    <Button size="sm" variant="secondary" onClick={() => mutate()} className="flex items-center gap-2">
      {data.isFollowedByUser ? 'Unfollow' : 'Follow'}
    </Button>
  )
}
