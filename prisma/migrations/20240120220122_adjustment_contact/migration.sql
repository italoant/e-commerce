/*
  Warnings:

  - You are about to alter the column `contact` on the `Client` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userFullName" TEXT NOT NULL,
    "contact" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "creatdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "external_user_id" TEXT NOT NULL,
    CONSTRAINT "Client_external_user_id_fkey" FOREIGN KEY ("external_user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Client" ("address", "contact", "creatdAt", "external_user_id", "id", "status", "updatedAt", "userFullName") SELECT "address", "contact", "creatdAt", "external_user_id", "id", "status", "updatedAt", "userFullName" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE UNIQUE INDEX "Client_external_user_id_key" ON "Client"("external_user_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
