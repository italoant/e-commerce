-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "order_status" TEXT NOT NULL,
    "payment_status" TEXT NOT NULL DEFAULT 'aguardando pagamento',
    "creation_date" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "total_order" DECIMAL NOT NULL,
    "external_client_id" TEXT NOT NULL,
    CONSTRAINT "Order_external_client_id_fkey" FOREIGN KEY ("external_client_id") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("creation_date", "external_client_id", "id", "order_status", "payment_status", "total_order") SELECT "creation_date", "external_client_id", "id", "order_status", "payment_status", "total_order" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
