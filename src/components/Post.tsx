import { type FC } from "react";
import { ButtonGroup } from "./Button/ButtonGroup";
import { Button } from "./Button";
import { PostDTO } from "../redux/slices/apis/postsDTO";

export interface PostProps {
  post: PostDTO;
  onDelete?: (id: number) => void;
  onEdit?: (post: PostDTO) => void;
}

export const Post: FC<PostProps> = ({ post, onEdit, onDelete }) => (
  <div>
    <ButtonGroup>
      <Button onClick={() => onDelete?.(post.id)}>&#128465; Delete</Button>
      <Button onClick={() => onEdit?.(post)}>&#9998; Edit</Button>
    </ButtonGroup>

    <dl className="body1">
      <dt>ID</dt>
      <dd>{post.id}</dd>
      <dt>Title</dt>
      <dd>{post.title || 'Empty'}</dd>
      <dt>Body</dt>
      <dd>{post.body || 'Empty'}</dd>
      <dt>Author ID</dt>
      <dd>{post.authorId}</dd>
    </dl>
  </div>
)