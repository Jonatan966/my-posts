import { relationship } from "@prisma/client";

interface CreateRelationshipDTO {
  follower_id: string;
  following_id: string;
}

interface FindManyByFollowingDTO {
  following_id: string;
  page_token?: string;
  page_size?: number;
}

export interface RelationshipRepository {
  relationships?: relationship[];
  create(data: CreateRelationshipDTO): Promise<relationship>;
  findOne(
    follower_id: string,
    following_id: string
  ): Promise<relationship | null>;
  findManyByFollower(follower_id: string): Promise<relationship[]>;
  findManyByFollowing(filters: FindManyByFollowingDTO): Promise<relationship[]>;
}
