/*
  Warnings:

  - You are about to drop the column `stock_quantity` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `total_order` on the `Order` table. All the data in the column will be lost.
  - Added the required column `stock_quantity` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_order` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "product_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "stock_quantity" INTEGER NOT NULL,
    "creation_date" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "update_date" DATETIME DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Product" ("creation_date", "description", "id", "price", "product_name", "update_date") SELECT "creation_date", "description", "id", "price", "product_name", "update_date" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE TABLE "new_Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "order_status" TEXT NOT NULL,
    "creation_date" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "total_order" DECIMAL NOT NULL,
    "external_client_id" TEXT NOT NULL,
    CONSTRAINT "Order_external_client_id_fkey" FOREIGN KEY ("external_client_id") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("creation_date", "external_client_id", "id", "order_status") SELECT "creation_date", "external_client_id", "id", "order_status" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
