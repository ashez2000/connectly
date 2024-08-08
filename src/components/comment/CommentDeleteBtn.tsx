import ky from 'ky'
import { useMutation, useQueryClient } from '@tanstack/react-query'
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
    <Button
      onClick={() => {
        mutation.mutate()
      }}
    >
      Delete
    </Button>
  )
}
