/*
  Warnings:

  - You are about to drop the column `address` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Store` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[storemail]` on the table `Store` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `storaddress` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storemail` to the `Store` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Store_email_key";

-- AlterTable
ALTER TABLE "Store" DROP COLUMN "address",
DROP COLUMN "email",
ADD COLUMN     "storaddress" TEXT NOT NULL,
ADD COLUMN     "storemail" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Store_storemail_key" ON "Store"("storemail");
