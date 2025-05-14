/*
  Warnings:

  - You are about to drop the column `name` on the `Store` table. All the data in the column will be lost.
  - Added the required column `storename` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Store" DROP COLUMN "name",
ADD COLUMN     "storename" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "address" TEXT NOT NULL;
