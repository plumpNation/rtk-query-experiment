import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { PostsDTO } from './postsDTO'

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }), // see vite config for proxy
  endpoints: (builder) => ({
    // builder.query<ResponseDTO, params passed to `query`>
    getPosts: builder.query<PostsDTO, void>({
      query: () => `posts`,
    }),
  }),
})

export const { useGetPostsQuery } = postsApi