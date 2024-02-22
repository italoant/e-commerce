-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "creation_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_date" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "contact" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "creation_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_date" TIMESTAMP(3) NOT NULL,
    "external_user_id" TEXT NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "stock_quantity" INTEGER NOT NULL,
    "creation_date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "order_status" TEXT,
    "payment_status" TEXT NOT NULL DEFAULT 'aguardando pagamento',
    "creation_date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "total_order" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "external_client_id" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItems" (
    "id" TEXT NOT NULL,
    "external_order_id" TEXT NOT NULL,
    "external_product_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitary_price" DECIMAL(65,30) NOT NULL,
    "subtotal" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "OrderItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SalesReport" (
    "id" TEXT NOT NULL,
    "period" TIMESTAMP(3),
    "total_sale" DECIMAL(65,30) NOT NULL,
    "total_orders" INTEGER NOT NULL,
    "file_path" TEXT NOT NULL,

    CONSTRAINT "SalesReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Client_external_user_id_key" ON "Client"("external_user_id");

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_external_user_id_fkey" FOREIGN KEY ("external_user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_external_client_id_fkey" FOREIGN KEY ("external_client_id") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_external_order_id_fkey" FOREIGN KEY ("external_order_id") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_external_product_id_fkey" FOREIGN KEY ("external_product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
