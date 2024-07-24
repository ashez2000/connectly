import PostForm from '@/components/post/post-form'
import PostFeed from './post-feed'

export default async function Page() {
  return (
    <div className="space-y-3">
      <PostForm />
      <PostFeed />
    </div>
  )
}
