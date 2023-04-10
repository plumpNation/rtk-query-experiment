import { type FC, useState } from "react";

import {
  useCreatePostMutation,
  useDeletePostMutation,
  useGetPostsQuery,
  useUpdatePostMutation,
} from "../redux/slices/apis/postsApi";

import { PostForm, type PostFormProps } from "./PostForm";

import type { CreatePostDTO, PostDTO } from "../redux/slices/apis/postsDTO";
import { Post } from "./Post";

const defaultFormData = (authorId: number, postId?: number): PostDTO | CreatePostDTO => ({
  id: postId,
  title: '',
  body: '',
  authorId,
})

const authorId = 1;

export const Posts: FC = () => {
  /**
   * @see https://redux-toolkit.js.org/rtk-query/usage/queries#frequently-used-query-hook-return-values
   */
  const { data: posts, error: readError, isLoading: isReading } = useGetPostsQuery()
  const [deletePost, { isLoading: isDeleting, error: deleteError }] = useDeletePostMutation()
  const [createPost, { isLoading: isCreating, error: createError }] = useCreatePostMutation();
  const [updatePost, { isLoading: isUpdating, error: updateError }] = useUpdatePostMutation();

  const [formData, setFormData] = useState<PostDTO | CreatePostDTO>(defaultFormData(authorId));

  if (isReading) {
    return <p>Loading...</p>;
  }

  if (!posts) {
    return <p>No data</p>;
  }

  const handleReset = () => {
    setFormData(defaultFormData(authorId));
  };

  const handleSubmit: PostFormProps['onSubmit'] = (post) => {
    if (post.id !== undefined) {
      updatePost(post);
    } else {
      createPost(post);
    }

    handleReset();
  };

  const handleDelete = (id: number) => () => {
    deletePost(id);

    if (formData.id === id) {
      // You've deleted the post you're currently editing.
      handleReset();
    }
  };

  const handleEdit = (post: PostDTO) => () => {
    setFormData(post);
  };

  const error = createError || readError || updateError  || deleteError;
  const working = isDeleting || isCreating || isUpdating;

  return (
    <div>
      <PostForm
        post={formData}
        onSubmit={handleSubmit}
        onReset={handleReset}
        busy={working}
      />

      {/* todo: https://github.com/reduxjs/redux-toolkit/issues/2942#issuecomment-1333299865 */}
      {error && <p>{error.status}: {JSON.stringify(error.data)}</p>}

      <section>
        <h2 className="h2">Posts</h2>

        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <Post
                post={post}
                onDelete={handleDelete(post.id)}
                onEdit={handleEdit(post)}
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};