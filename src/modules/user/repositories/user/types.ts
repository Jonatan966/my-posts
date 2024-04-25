import { user } from "@prisma/client";

export interface CreateUserDTO {
  display_name: string;
  username: string;
  password: string;
  bio?: string;
}

export interface UpdateUserDTO {
  id: string;
  display_name?: string;
  username?: string;
  password?: string;
  bio?: string;
  username_updated_at?: Date;
}

export interface FindManyUsersDTO {
  querySearch?: string;
}

export interface UserRepository {
  users?: user[];
  findOneByUsername(username: string): Promise<user | null>;
  findOneById(userId: string): Promise<user | null>;
  findMany(filters?: FindManyUsersDTO): Promise<user[]>;
  findManyByIds(ids: string[]): Promise<user[]>;
  create(user: CreateUserDTO): Promise<user>;
  update(user: UpdateUserDTO): Promise<user>;
}
