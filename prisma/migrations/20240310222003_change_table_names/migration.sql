/*
  Warnings:

  - You are about to drop the `Announcement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserAnnouncementView` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserAnnouncementView" DROP CONSTRAINT "UserAnnouncementView_announcementID_fkey";

-- DropTable
DROP TABLE "Announcement";

-- DropTable
DROP TABLE "UserAnnouncementView";

-- CreateTable
CREATE TABLE "announcement" (
    "announcementID" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "group" "AnnouncementGroup" NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "profileImageURL" TEXT NOT NULL,

    CONSTRAINT "announcement_pkey" PRIMARY KEY ("announcementID")
);

-- CreateTable
CREATE TABLE "userAnnouncementView" (
    "userID" TEXT NOT NULL,
    "announcementID" INTEGER NOT NULL,

    CONSTRAINT "userAnnouncementView_pkey" PRIMARY KEY ("userID","announcementID")
);

-- AddForeignKey
ALTER TABLE "userAnnouncementView" ADD CONSTRAINT "userAnnouncementView_announcementID_fkey" FOREIGN KEY ("announcementID") REFERENCES "announcement"("announcementID") ON DELETE RESTRICT ON UPDATE CASCADE;
