import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';

import type { CommentDTO } from './postsDTO';

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery,
  endpoints: (builder) => ({
    getComments: builder.query<CommentDTO[], void>({
      query: () => `comments`,
    }),
  }),
});

export const { useGetCommentsQuery } = commentsApi;