import type { FC } from "react";

import { useGetPostsQuery } from "../redux/slices/apis/postsApi";

export const Posts: FC = () => {
  /**
   * @see https://redux-toolkit.js.org/rtk-query/usage/queries#frequently-used-query-hook-return-values
   */
  const { data, error, isLoading } = useGetPostsQuery()

  if (isLoading) {
    return <p>Loading...</p>;
  }

  // todo: https://github.com/reduxjs/redux-toolkit/issues/2942#issuecomment-1333299865
  if (error) {
    return <p>{error.status}: </p>;
  }

  if (!data) {
    return <p>No data</p>;
  }

  return (
    <section>
      <h2>Posts</h2>
      <ul>
        {data.posts.map((post) => (
          <li key={post.id}>
            <dl>
              <dt>ID</dt>
              <dd>{post.id}</dd>
              <dt>Title</dt>
              <dd>{post.title}</dd>
              <dt>Author</dt>
              <dd>{post.author.name}</dd>
              <dt>Comments</dt>
              <dd>
                <ul>
                  {data.comments
                    .filter((comment) => comment.postId === post.id)
                    .map((comment) => (
                      <li key={comment.id}>
                        <dl>
                          <dt>ID</dt>
                          <dd>{comment.id}</dd>
                          <dt>Body</dt>
                          <dd>{comment.body}</dd>
                          <dt>Author</dt>
                          <dd>{comment.author.name}</dd>
                        </dl>
                      </li>
                    ))}
                </ul>
              </dd>
            </dl>
          </li>
        ))}
      </ul>

    </section>
  );
};