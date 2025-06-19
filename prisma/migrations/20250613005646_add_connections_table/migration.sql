/*
  Warnings:

  - You are about to drop the `Couple` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ConnectionType" AS ENUM ('couple', 'friends', 'team', 'other');

-- DropForeignKey
ALTER TABLE "Couple" DROP CONSTRAINT "Couple_user1Id_fkey";

-- DropForeignKey
ALTER TABLE "Couple" DROP CONSTRAINT "Couple_user2Id_fkey";

-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "connectionId" TEXT;

-- AlterTable
ALTER TABLE "InviteCode" ADD COLUMN     "connectionId" TEXT;

-- DropTable
DROP TABLE "Couple";

-- CreateTable
CREATE TABLE "Connection" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "ConnectionType" NOT NULL,

    CONSTRAINT "Connection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConnectionMember" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "connectionId" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConnectionMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ConnectionMember_userId_connectionId_key" ON "ConnectionMember"("userId", "connectionId");

-- AddForeignKey
ALTER TABLE "ConnectionMember" ADD CONSTRAINT "ConnectionMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConnectionMember" ADD CONSTRAINT "ConnectionMember_connectionId_fkey" FOREIGN KEY ("connectionId") REFERENCES "Connection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_connectionId_fkey" FOREIGN KEY ("connectionId") REFERENCES "Connection"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InviteCode" ADD CONSTRAINT "InviteCode_connectionId_fkey" FOREIGN KEY ("connectionId") REFERENCES "Connection"("id") ON DELETE SET NULL ON UPDATE CASCADE;
