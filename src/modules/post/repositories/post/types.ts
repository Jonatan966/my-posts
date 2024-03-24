import { post } from "@prisma/client";

interface CreatePostDTO {
  content: string;
  author_id: string;
}

export interface PostRepository {
  posts?: post[];
  create(postData: CreatePostDTO): Promise<post>;
  delete(post_id: string): Promise<void>;
  findOneById(post_id: string): Promise<post | null>;
}
