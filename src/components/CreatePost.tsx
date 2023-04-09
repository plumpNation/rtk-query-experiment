import type { FC } from "react";

import { useCreatePostMutation } from "../redux/slices/apis/postsApi";

export const CreatePost: FC = () => {
  const [createPost, { isLoading: isCreating, error }] = useCreatePostMutation();

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const title = event.currentTarget.elements.namedItem("title") as HTMLInputElement;
    const body = event.currentTarget.elements.namedItem("body") as HTMLInputElement;

    createPost({
      title: title.value,
      body: body.value,
      authorId: 1,
    });
  };

  if (error) {
    return <p>{error.status}: {JSON.stringify(error.data)}</p>;
  }

  return (
    <section>
      <h2>Create post {isCreating ? '(saving)' : null}</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" />
        </div>

        <div>
          <label htmlFor="body">Body</label>
          <input type="text" id="body" />
        </div>

        <button type="submit">Create</button>
      </form>
    </section>
  );
};