'use client'

import { useState } from 'react'

import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { createPost } from './actions'

export default function PostForm() {
  const [content, setContent] = useState('')

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    await createPost(content)
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
