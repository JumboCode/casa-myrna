-- DropForeignKey
ALTER TABLE "userAnnouncementView" DROP CONSTRAINT "userAnnouncementView_announcementID_fkey";

-- AddForeignKey
ALTER TABLE "userAnnouncementView" ADD CONSTRAINT "userAnnouncementView_announcementID_fkey" FOREIGN KEY ("announcementID") REFERENCES "announcement"("announcementID") ON DELETE CASCADE ON UPDATE CASCADE;
