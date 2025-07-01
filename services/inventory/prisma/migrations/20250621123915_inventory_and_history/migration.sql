-- CreateEnum
CREATE TYPE "ActionType" AS ENUM ('IN', 'OUT');

-- CreateTable
CREATE TABLE "inventories" (
    "id" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inventories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock_histories" (
    "id" TEXT NOT NULL,
    "inventoryId" TEXT NOT NULL,
    "action" "ActionType" NOT NULL,
    "lastQuantity" INTEGER NOT NULL,
    "currentQuantity" INTEGER NOT NULL,
    "newQuantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stock_histories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "inventories_sku_key" ON "inventories"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "inventories_productId_key" ON "inventories"("productId");

-- AddForeignKey
ALTER TABLE "stock_histories" ADD CONSTRAINT "stock_histories_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "inventories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
