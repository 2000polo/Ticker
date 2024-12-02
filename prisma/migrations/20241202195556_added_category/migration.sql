/*
  Warnings:

  - Added the required column `category` to the `Issue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `issue` ADD COLUMN `category` MEDIUMTEXT NOT NULL;
