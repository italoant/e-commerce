/*
  Warnings:

  - You are about to drop the column `fullName` on the `Client` table. All the data in the column will be lost.
  - Added the required column `full_name` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "full_name" TEXT NOT NULL,
    "contact" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "creation_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_date" DATETIME NOT NULL,
    "external_user_id" TEXT NOT NULL,
    CONSTRAINT "Client_external_user_id_fkey" FOREIGN KEY ("external_user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Client" ("address", "contact", "creation_date", "external_user_id", "id", "isActive", "update_date") SELECT "address", "contact", "creation_date", "external_user_id", "id", "isActive", "update_date" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE UNIQUE INDEX "Client_external_user_id_key" ON "Client"("external_user_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
