/*
  Warnings:

  - Added the required column `external_product_id` to the `OrderItems` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "SalesReport" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "period" DATETIME,
    "totalSale" DECIMAL NOT NULL,
    "purchaseProduct" INTEGER NOT NULL,
    "filePath" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OrderItems" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "external_order_id" TEXT NOT NULL,
    "external_product_id" TEXT NOT NULL,
    CONSTRAINT "OrderItems_external_order_id_fkey" FOREIGN KEY ("external_order_id") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrderItems_external_product_id_fkey" FOREIGN KEY ("external_product_id") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OrderItems" ("external_order_id", "id") SELECT "external_order_id", "id" FROM "OrderItems";
DROP TABLE "OrderItems";
ALTER TABLE "new_OrderItems" RENAME TO "OrderItems";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
