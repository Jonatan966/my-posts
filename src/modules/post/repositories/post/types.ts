import { post } from "@prisma/client";

interface CreatePostDTO {
  content: string;
  author_id: string;
}

export interface PostRepository {
  posts?: post[];
  create(postData: CreatePostDTO): Promise<post>;
}
