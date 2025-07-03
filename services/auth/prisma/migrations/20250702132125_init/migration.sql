/*
  Warnings:

  - A unique constraint covering the columns `[userId,code]` on the table `verification_codes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "verification_codes_userId_code_key" ON "verification_codes"("userId", "code");
