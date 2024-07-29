'use client'

import { Button } from '../ui/button'
import { deletePost } from './actions'
import { usePostDeleteMutation } from './mutations'

export default function PostDeleteBtn({ id }: any) {
  const mutation = usePostDeleteMutation()

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={() => {
        mutation.mutate(id)
      }}
    >
      Delete
    </Button>
  )
}
