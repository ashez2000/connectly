'use client'

import { Button } from '../ui/button'
import { deletePost } from './actions'

export default function PostDeleteBtn({ id }: any) {
  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={() => {
        deletePost(id)
      }}
    >
      Delete
    </Button>
  )
}
