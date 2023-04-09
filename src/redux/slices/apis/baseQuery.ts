import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

export const baseQuery = fetchBaseQuery({
  baseUrl: '/api', // see vite config for proxy

  prepareHeaders: (headers, { type }) => {
    const token = 'I am a token from a store somewhere';

    headers.set('Authorization', `Bearer ${token}`)

    if (type === 'mutation') {
      headers.set('Content-Type', 'application/json')
    }

    // We may need to figure out how to accept something other than JSON, like an empty response
    headers.set('Accept', 'application/json')

    return headers
  },
})