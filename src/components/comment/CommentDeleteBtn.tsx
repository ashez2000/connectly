import ky from 'ky'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'

import { Button } from '../ui/button'

type Props = {
  postId: string
  commentId: string
}

export default function CommentDeleteBtn({ postId, commentId }: Props) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async () => {
      await ky.delete(`/api/comments/${commentId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] })
    },
    onError: (err) => {
      console.error(err)
    },
  })

  return (
    <button
      className="px-1 border border-red-500 rounded"
      onClick={() => {
        mutation.mutate()
      }}
    >
      <Trash2 className="w-4 text-red-500" />
    </button>
  )
}
