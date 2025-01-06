/*
  Warnings:

  - You are about to drop the `Mentor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Mentor";

-- CreateTable
CREATE TABLE "mentors" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(70) NOT NULL,
    "username" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mentors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "mentors_username_key" ON "mentors"("username");
