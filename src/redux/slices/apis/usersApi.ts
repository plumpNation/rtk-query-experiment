import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';

import type { UserDTO } from './postsDTO';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery,
  endpoints: (builder) => ({
    getUsers: builder.query<UserDTO[], void>({
      query: () => `users`,
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;