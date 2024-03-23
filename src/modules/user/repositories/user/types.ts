import { user } from "@prisma/client";

export interface CreateUserDTO {
  display_name: string;
  username: string;
  bio?: string;
}

export interface UpdateUserDTO {
  id: string;
  display_name?: string;
  username?: string;
  bio?: string;
}

export interface UserRepository {
  users?: user[];
  findOneByUsername(username: string): Promise<user | null>;
  create(user: CreateUserDTO): Promise<user>;
  update(user: UpdateUserDTO): Promise<user>;
}
