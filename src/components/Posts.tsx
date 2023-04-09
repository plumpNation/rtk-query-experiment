import type { FC } from "react";

import { useDeletePostMutation, useGetPostsQuery } from "../redux/slices/apis/postsApi";
import { CreatePost } from "./CreatePost";

export const Posts: FC = () => {
  /**
   * @see https://redux-toolkit.js.org/rtk-query/usage/queries#frequently-used-query-hook-return-values
   */
  const { data: posts, error, isLoading } = useGetPostsQuery()
  const [ deletePost, { isLoading: isDeleting, error: deleteError }] = useDeletePostMutation()

  if (isLoading) {
    return <p>Loading...</p>;
  }

  // todo: https://github.com/reduxjs/redux-toolkit/issues/2942#issuecomment-1333299865
  if (error) {
    return <p>{error.status}: {JSON.stringify(error.data)}</p>;
  }

  if (!posts) {
    return <p>No data</p>;
  }

  return (
    <section>

      <CreatePost />

      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <button onClick={() => deletePost(post.id)}>Delete</button>
            <dl>
              <dt>ID</dt>
              <dd>{post.id}</dd>
              <dt>Title</dt>
              <dd>{post.title}</dd>
              <dt>Author ID</dt>
              <dd>{post.authorId}</dd>
              {/* <dt>Comments</dt>
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
              </dd> */}
            </dl>
          </li>
        ))}
      </ul>

    </section>
  );
};