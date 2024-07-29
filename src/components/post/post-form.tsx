'use client'

import { useState } from 'react'

import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { usePostSubmitMutation } from './mutations'

export default function PostForm() {
  const [content, setContent] = useState('')
  const mutation = usePostSubmitMutation()

  const handleSubmit = (e: any) => {
    e.preventDefault()
    mutation.mutate(content, {
      onSuccess: () => {
        setContent('')
      },
    })
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <Textarea
        placeholder="Make a post!"
        onChange={(e) => setContent(e.target.value)}
        value={content}
      />
      <Button type="submit">Post</Button>
    </form>
  )
}
