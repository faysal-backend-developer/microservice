-- DropForeignKey
ALTER TABLE "stock_histories" DROP CONSTRAINT "stock_histories_inventoryId_fkey";

-- AddForeignKey
ALTER TABLE "stock_histories" ADD CONSTRAINT "stock_histories_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "inventories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
