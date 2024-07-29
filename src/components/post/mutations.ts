import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPost, deletePost } from './actions'

// TODO: remove invalidateQueries with manual cache update
export const usePostSubmitMutation = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
    onError: (err) => {
      console.error(err)
    },
  })

  return mutation
}

// TODO: remove invalidateQueries with manual cache update
export const usePostDeleteMutation = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
    onError: (err) => {
      console.error(err)
    },
  })

  return mutation
}
