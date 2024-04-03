import { post } from "@prisma/client";

interface CreatePostDTO {
  content: string;
  author_id: string;
  original_version_id?: string;
  reposted_post_id?: string;
}

interface UpdatePostDTO {
  id: string;
  is_edited?: boolean;
}

export interface PostRepository {
  posts?: post[];
  create(postData: CreatePostDTO): Promise<post>;
  delete(post_id: string): Promise<void>;
  findOneById(post_id: string): Promise<post | null>;
  update(post: UpdatePostDTO): Promise<post>;
}
