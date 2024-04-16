import { relationship } from "@prisma/client";

interface CreateRelationshipDTO {
  follower_id: string;
  following_id: string;
}

export interface RelationshipRepository {
  relationships?: relationship[];
  create(data: CreateRelationshipDTO): Promise<relationship>;
  findOne(
    follower_id: string,
    following_id: string
  ): Promise<relationship | null>;
  findManyByFollower(follower_id: string): Promise<relationship[]>;
  findManyByFollowing(following_id: string): Promise<relationship[]>;
}
