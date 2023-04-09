export interface User {
  id: number
  name: string
}

export interface Post {
  id: number
  title: string
  author: User
}

export interface Comment {
  id: number
  postId: number
  body: string
  author: User
}

export interface PostsDTO {
  posts: Post[]
  comments: Comment[]
  profile: User
}