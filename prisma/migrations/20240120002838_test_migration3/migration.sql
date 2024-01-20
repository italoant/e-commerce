/*
  Warnings:

  - Added the required column `external_client_id` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `external_order_id` to the `OrderItems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `external_user_id` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderStatus" TEXT NOT NULL,
    "createAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "totalOrder" DECIMAL NOT NULL,
    "external_client_id" TEXT NOT NULL,
    CONSTRAINT "Order_external_client_id_fkey" FOREIGN KEY ("external_client_id") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("createAt", "id", "orderStatus", "totalOrder") SELECT "createAt", "id", "orderStatus", "totalOrder" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE TABLE "new_OrderItems" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "external_order_id" TEXT NOT NULL,
    CONSTRAINT "OrderItems_external_order_id_fkey" FOREIGN KEY ("external_order_id") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OrderItems" ("id") SELECT "id" FROM "OrderItems";
DROP TABLE "OrderItems";
ALTER TABLE "new_OrderItems" RENAME TO "OrderItems";
CREATE TABLE "new_Client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userFullName" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "adress" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "creatdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "external_user_id" TEXT NOT NULL,
    CONSTRAINT "Client_external_user_id_fkey" FOREIGN KEY ("external_user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Client" ("adress", "contact", "creatdAt", "id", "status", "updatedAt", "userFullName") SELECT "adress", "contact", "creatdAt", "id", "status", "updatedAt", "userFullName" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE UNIQUE INDEX "Client_external_user_id_key" ON "Client"("external_user_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
