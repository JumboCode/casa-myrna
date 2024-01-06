/*
  Warnings:

  - You are about to drop the `Shift` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Shift" DROP CONSTRAINT "Shift_backupUserID_fkey";

-- DropForeignKey
ALTER TABLE "Shift" DROP CONSTRAINT "Shift_primaryUserID_fkey";

-- DropTable
DROP TABLE "Shift";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "primaryShift" (
    "primaryShiftID" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "onCallShiftID" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "from" TIMESTAMP(3) NOT NULL,
    "to" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "message" TEXT NOT NULL,
    "phoneLine" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "primaryShift_pkey" PRIMARY KEY ("primaryShiftID")
);

-- CreateTable
CREATE TABLE "onCallShift" (
    "onCallShiftID" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "from" TIMESTAMP(3) NOT NULL,
    "to" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "message" TEXT NOT NULL,
    "phoneLine" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "onCallShift_pkey" PRIMARY KEY ("onCallShiftID")
);

-- AddForeignKey
ALTER TABLE "primaryShift" ADD CONSTRAINT "primaryShift_onCallShiftID_fkey" FOREIGN KEY ("onCallShiftID") REFERENCES "onCallShift"("onCallShiftID") ON DELETE RESTRICT ON UPDATE CASCADE;
