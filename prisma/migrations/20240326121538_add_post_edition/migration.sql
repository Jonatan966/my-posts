-- AlterTable
ALTER TABLE "post" ADD COLUMN     "is_edited" BOOLEAN,
ADD COLUMN     "original_version_id" TEXT;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_original_version_id_fkey" FOREIGN KEY ("original_version_id") REFERENCES "post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
