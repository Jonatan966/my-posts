-- AlterTable
ALTER TABLE "post" ADD COLUMN     "parent_post_id" VARCHAR(24),
ADD COLUMN     "root_post_id" VARCHAR(24);

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_parent_post_id_fkey" FOREIGN KEY ("parent_post_id") REFERENCES "post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_root_post_id_fkey" FOREIGN KEY ("root_post_id") REFERENCES "post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
