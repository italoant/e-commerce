/*
  Warnings:

  - You are about to drop the column `subtotal` on the `OrderItems` table. All the data in the column will be lost.
  - You are about to drop the column `unitary_price` on the `OrderItems` table. All the data in the column will be lost.
  - You are about to drop the column `filePath` on the `SalesReport` table. All the data in the column will be lost.
  - You are about to drop the column `purchaseProduct` on the `SalesReport` table. All the data in the column will be lost.
  - You are about to drop the column `totalSale` on the `SalesReport` table. All the data in the column will be lost.
  - You are about to drop the column `creation_date` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `product_name` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `update_date` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `creation_date` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `order_status` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `creation_date` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `update_date` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `creation_date` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `update_date` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `full_name` on the `Client` table. All the data in the column will be lost.
  - Added the required column `subtotal` to the `OrderItems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitary_price` to the `OrderItems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `file_path` to the `SalesReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_orders` to the `SalesReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_sale` to the `SalesReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_name` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_status` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_date` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isActive` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_date` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OrderItems" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "external_order_id" TEXT NOT NULL,
    "external_product_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitary_price" DECIMAL NOT NULL,
    "subtotal" DECIMAL NOT NULL,
    CONSTRAINT "OrderItems_external_order_id_fkey" FOREIGN KEY ("external_order_id") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrderItems_external_product_id_fkey" FOREIGN KEY ("external_product_id") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OrderItems" ("external_order_id", "external_product_id", "id", "quantity") SELECT "external_order_id", "external_product_id", "id", "quantity" FROM "OrderItems";
DROP TABLE "OrderItems";
ALTER TABLE "new_OrderItems" RENAME TO "OrderItems";
CREATE TABLE "new_SalesReport" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "period" DATETIME,
    "total_sale" DECIMAL NOT NULL,
    "total_orders" INTEGER NOT NULL,
    "file_path" TEXT NOT NULL
);
INSERT INTO "new_SalesReport" ("id", "period") SELECT "id", "period" FROM "SalesReport";
DROP TABLE "SalesReport";
ALTER TABLE "new_SalesReport" RENAME TO "SalesReport";
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "product_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "stock_quantity" INTEGER NOT NULL,
    "creation_date" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "update_date" DATETIME DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Product" ("description", "id", "price", "stock_quantity") SELECT "description", "id", "price", "stock_quantity" FROM "Product";
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
INSERT INTO "new_Order" ("external_client_id", "id", "total_order") SELECT "external_client_id", "id", "total_order" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "creation_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_date" DATETIME NOT NULL,
    "type" TEXT NOT NULL
);
INSERT INTO "new_User" ("email", "id", "name", "password", "type") SELECT "email", "id", "name", "password", "type" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new_Client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL,
    "contact" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "creation_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_date" DATETIME NOT NULL,
    "external_user_id" TEXT NOT NULL,
    CONSTRAINT "Client_external_user_id_fkey" FOREIGN KEY ("external_user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Client" ("address", "contact", "external_user_id", "id") SELECT "address", "contact", "external_user_id", "id" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE UNIQUE INDEX "Client_external_user_id_key" ON "Client"("external_user_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
