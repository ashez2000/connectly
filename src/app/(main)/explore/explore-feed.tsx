'use client'

import ky from 'ky'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'

import { PostsPage } from '@/lib/prisma'
import PostCard from '@/components/post/post-card'
import { Button } from '@/components/ui/button'

type Props = {
  search: string
}

export default function ExploreFeed({ search }: Props) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['posts', 'feed', search],

    queryFn: async ({ pageParam }) =>
      ky
        .get(
          '/api/posts/explore',
          pageParam
            ? { searchParams: { cursor: pageParam, search } }
            : { searchParams: { search } }
        )
        .json<PostsPage>(),

    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  })

  const posts = data?.pages.flatMap((page) => page.posts) || []

  if (status === 'pending') {
    return (
      <div>
        <Loader2 className="mx-auto animate-spin" />
      </div>
    )
  }

  if (status === 'success' && !posts.length && !hasNextPage) {
    return (
      <p className="text-center text-muted-foreground">
        No one has posted anything yet.
      </p>
    )
  }

  if (status === 'error') {
    return (
      <p className="text-center text-destructive">
        An error occurred while loading posts.
      </p>
    )
  }

  return (
    <div>
      <div className="space-y-5 mb-3">
        {isFetchingNextPage && (
          <Loader2 className="mx-auto my-3 animate-spin" />
        )}

        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      {hasNextPage && (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => fetchNextPage()}
            disabled={isFetching}
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  )
}
