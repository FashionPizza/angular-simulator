export interface IPost {
  id: number;
  title: string;
  body: string;
  tags: string[];
  views: number;
  reactions: { likes: number; dislikes: number };
  userId: number;
}

export interface IPostResponse {
  posts: IPost[];
  total: number;
  skip: number;
  limit: number;
}