-- CreateTable
CREATE TABLE "relationship" (
    "follower_id" VARCHAR(24) NOT NULL,
    "following_id" VARCHAR(24) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "relationship_pkey" PRIMARY KEY ("follower_id","following_id")
);

-- AddForeignKey
ALTER TABLE "relationship" ADD CONSTRAINT "relationship_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relationship" ADD CONSTRAINT "relationship_following_id_fkey" FOREIGN KEY ("following_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
