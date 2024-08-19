import { notFound, redirect } from 'next/navigation'
import { validateRequest } from '@/lib/lucia'
import prisma, { getUserProfileDataInclude } from '@/lib/prisma'

import PostFeed from './post-feed'

type Props = {
  params: {
    username: string
  }
}

export default async function Page({ params: { username } }: Props) {
  const { user: curUser } = await validateRequest()
  if (!curUser) {
    return redirect('/signin')
  }

  const user = await fetchProfileData(username, curUser.id)
  if (!user) {
    return notFound()
  }

  return (
    <div className="space-y-3 max-w-md mx-auto">
      <section className="border border-slate-600 p-3 rounded-md">
        <div className="mb-3">
          <h3 className="text-xl font-semibold">{user.displayName}</h3>
          <h4>@{user.username}</h4>
        </div>
        <div className="text-sm flex gap-3">
          <Stat name="posts" value={user._count.posts} />
          <Stat name="followers" value={user._count.followers} />
          <Stat name="following" value={user._count.following} />
        </div>
      </section>
      <PostFeed userId={user.id} />
    </div>
  )
}

function Stat(props: { name: string; value: number }) {
  return (
    <div>
      <span className="font-bold">{props.name}</span> {props.value}
    </div>
  )
}

/** fetch profile data */
async function fetchProfileData(username: string, curUserId: string) {
  return await prisma.user.findUnique({
    where: { username },
    select: getUserProfileDataInclude(curUserId),
  })
}
