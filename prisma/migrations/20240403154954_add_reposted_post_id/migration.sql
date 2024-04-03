-- AlterTable
ALTER TABLE "post" ADD COLUMN     "reposted_post_id" VARCHAR(24);

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_reposted_post_id_fkey" FOREIGN KEY ("reposted_post_id") REFERENCES "post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
