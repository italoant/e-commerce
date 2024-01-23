/*
  Warnings:

  - You are about to drop the column `unityPrice` on the `OrderItems` table. All the data in the column will be lost.
  - Added the required column `unitaryPrice` to the `OrderItems` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OrderItems" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "external_order_id" TEXT NOT NULL,
    "external_product_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitaryPrice" DECIMAL NOT NULL,
    "subTotal" DECIMAL NOT NULL,
    CONSTRAINT "OrderItems_external_order_id_fkey" FOREIGN KEY ("external_order_id") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrderItems_external_product_id_fkey" FOREIGN KEY ("external_product_id") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OrderItems" ("external_order_id", "external_product_id", "id", "quantity", "subTotal") SELECT "external_order_id", "external_product_id", "id", "quantity", "subTotal" FROM "OrderItems";
DROP TABLE "OrderItems";
ALTER TABLE "new_OrderItems" RENAME TO "OrderItems";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
