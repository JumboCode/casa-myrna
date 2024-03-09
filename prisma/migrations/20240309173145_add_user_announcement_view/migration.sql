-- CreateTable
CREATE TABLE "UserAnnouncementView" (
    "userAnnouncementViewID" SERIAL NOT NULL,
    "userID" TEXT NOT NULL,
    "announcementID" INTEGER NOT NULL,

    CONSTRAINT "UserAnnouncementView_pkey" PRIMARY KEY ("userAnnouncementViewID")
);

-- AddForeignKey
ALTER TABLE "UserAnnouncementView" ADD CONSTRAINT "UserAnnouncementView_announcementID_fkey" FOREIGN KEY ("announcementID") REFERENCES "Announcement"("announcementID") ON DELETE RESTRICT ON UPDATE CASCADE;
