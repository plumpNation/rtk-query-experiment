// Using the `react` export from `@reduxjs/toolkit/query` will give you the
// same functionality, but with the added benefit of being able to use the
// `useGetPostsQuery` hook to get the data from the store.
import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './baseQuery'

import type { CreatePostDTO, PostDTO } from './postsDTO'

export const postsApi = createApi({
  reducerPath: 'postsApi',

  tagTypes: ['Posts'],

  baseQuery,

  endpoints: (builder) => ({
    getPost: builder.query<PostDTO, number>({
      query: (id) => `post/${id}`,
      providesTags: (result, error, id) => [{ type: 'Posts', id }],
    }),

    getPosts: builder.query<PostDTO[], void>({
      query: () => `posts`,
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ id }) => ({ type: 'Posts', id } as const)),
              { type: 'Posts', id: 'LIST' },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: 'Posts', id: 'LIST' }],

        // note that this query won't invalidate any tags
    }),

    createPost: builder.mutation<PostDTO, CreatePostDTO>({
      query: (body) => ({
        url: `posts`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),

    updatePost: builder.mutation<PostDTO, PostDTO>({
      query(data) {
        const { id, ...body } = data
        return {
          url: `posts/${id}`,
          method: 'PUT',
          body,
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'Posts', id }],
    }),

    deletePost: builder.mutation<void, number>({
      query: (id) => ({
        url: `posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Posts', id }],
    }),
  }),
})

export const { useGetPostsQuery, useCreatePostMutation, useDeletePostMutation, useUpdatePostMutation } = postsApi