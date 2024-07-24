import prisma from '@/lib/prisma'
import PostForm from '@/components/post/post-form'

export default async function Page() {
  const posts = await prisma.post.findMany()

  return (
    <div className="space-y-3">
      <PostForm />
      <div className="space-y-3">
        {posts.map((p) => (
          <div key={p.id}>
            <code>{JSON.stringify(p)}</code>
          </div>
        ))}
      </div>
    </div>
  )
}
