'use client'

import { useState } from 'react'
import ky from 'ky'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useMutation, useQueryClient } from '@tanstack/react-query'

type Props = {
  postId: string
}

export default function CommentForm({ postId }: Props) {
  const [content, setContent] = useState('')
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (c: string) => {
      await ky.post(`/api/posts/${postId}/comments`, { json: { content: c } })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] })
    },
    onError: (err) => {
      console.error(err)
    },
  })

  const handleSubmit = (e: any) => {
    e.preventDefault()
    mutation.mutate(content)
    setContent('')
  }

  return (
    <form className="mb-3" onSubmit={handleSubmit}>
      <Input
        className="mb-3"
        placeholder="comment"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button>Submit</Button>
    </form>
  )
}
