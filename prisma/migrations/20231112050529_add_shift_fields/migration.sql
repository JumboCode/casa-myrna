/*
  Warnings:

  - Added the required column `created_at` to the `Shift` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Shift` table without a default value. This is not possible if the table is not empty.
  - Added the required column `from` to the `Shift` table without a default value. This is not possible if the table is not empty.
  - Added the required column `to` to the `Shift` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'ACCEPTED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Shift" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "from" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "to" TIMESTAMP(3) NOT NULL;
