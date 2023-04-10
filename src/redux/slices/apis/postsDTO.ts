export interface UserDTO {
  id: number
  name: string
}

export interface PostDTO {
  id: number
  title: string
  body: string
  authorId: number
}

export interface CreatePostDTO extends Omit<PostDTO, 'id'> {
  id?: undefined
}

export interface CommentDTO {
  id: number
  postId: number
  body: string
  author: UserDTO
}