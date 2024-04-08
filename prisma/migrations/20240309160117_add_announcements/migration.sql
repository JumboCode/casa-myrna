-- CreateEnum
CREATE TYPE "AnnouncementGroup" AS ENUM ('Coordinator', 'Full_time', 'Part_time', 'Relief');

-- CreateTable
CREATE TABLE "Announcement" (
    "announcementID" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "group" "AnnouncementGroup" NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "profileImageURL" TEXT NOT NULL,

    CONSTRAINT "Announcement_pkey" PRIMARY KEY ("announcementID")
);
