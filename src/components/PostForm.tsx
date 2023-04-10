import { type FC, useState, useEffect } from "react";

import { Button } from "./Button";

import { ButtonGroup } from "./Button/ButtonGroup";

import type { CreatePostDTO, PostDTO } from "../redux/slices/apis/postsDTO";

import "./PostForm.css";

export interface PostFormProps {
  post: PostDTO | CreatePostDTO;
  onSubmit?: (post: PostDTO | CreatePostDTO) => void;
  onReset?: () => void;
  busy?: boolean;
}

export const PostForm: FC<PostFormProps> = ({ post, busy, onSubmit, onReset }) => {
  const [formData, setFormData] = useState<PostDTO | CreatePostDTO>(post);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit?.(formData);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFormData: typeof formData = {
      ...formData,
      [event.target.name]: event.target.value,
    }

    setFormData(newFormData)
  };

  useEffect(() => {
    // Allow form data to be overridden at any time from the parent component.
    setFormData(post);
  }, [post]);

  return (
    <section className="post-form">
      <h2 className="h2">{formData?.id ? `Edit post ${formData.id}` : 'Create post'}</h2>

      <form onSubmit={handleFormSubmit}>
        <div>
          <label className="label body1">
            <span>Title</span>
            <input
              name="title"
              className="input"
              type="text"
              value={formData?.title ?? ''}
              onChange={handleChange}
              disabled={busy}
            />
          </label>
        </div>

        <div>
          <label className="label body1">
            <span>Body</span>
            <input
              name="body"
              className="input"
              type="text"
              value={formData?.body ?? ''}
              onChange={handleChange}
              disabled={busy}
            />
          </label>
        </div>

        <ButtonGroup>
          <Button type="submit" disabled={busy}>{busy ? 'Saving' : 'Submit'}</Button>
          <Button type="reset" onClick={onReset} disabled={busy}>Clear</Button>
        </ButtonGroup>
      </form>
    </section>
  );
};