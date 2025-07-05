import { Inventory } from "@prisma/client";
import prisma from "../../../prisma";
import { updateInventory } from "../../helpers/types";


const createInventory = async (inventory: Inventory): Promise<Inventory | null> => {

    const result = await prisma.$transaction(async (tx) => {
        const newInventory = await tx.inventory.create({
            data: inventory
        });

        await tx.stockHistory.create({
            data: {
                inventoryId: newInventory.id,
                action: "IN",
                lastQuantity: 0,
                currentQuantity: newInventory.quantity,
                newQuantity: newInventory.quantity,
            }
        })

        return newInventory
    })

    return result;
};



const getAllInventories = async (): Promise<Inventory[]> => {

    const inventories = await prisma.inventory.findMany();
    return inventories
};


const getInventoryById = async (id: string): Promise<Inventory | null> => {
    const inventory = await prisma.inventory.findUnique({
        where: { id }
    });

    if (!inventory) {
        return null;
    }

    return inventory;
};
const getInventoryDetailsById = async (id: string): Promise<Inventory | null> => {
    const inventory = await prisma.inventory.findUnique({
        where: { id },
        include: {
            StockHistory: {
                orderBy: {
                    createdAt: "desc"
                }
            }
        }
    });

    if (!inventory) {
        return null;
    }

    return inventory;
};

const updateInventory = async (id: string, inventory: Partial<updateInventory>): Promise<Partial<Inventory | null>> => {
    const updatedInventory = await prisma.$transaction(async (tx) => {
        const existingInventory = await tx.inventory.findUnique({
            where: { id }
        });
        if (!existingInventory) {
            throw new Error("Inventory not found");
        }

        const lastQuantity = existingInventory.quantity;
        let newQuantity = lastQuantity;

        if (inventory.action === "IN") {
            newQuantity = newQuantity + (inventory.quantity || 0);
        } else if (inventory.action === "OUT") {
            if ((inventory.quantity || 0) > newQuantity) {
                throw new Error("Insufficient stock to perform OUT action");
            }
            newQuantity = newQuantity - (inventory.quantity || 0);
        } else {
            throw new Error("Invalid action");
        }

        const updateInventory = await tx.inventory.update({
            where: { id },
            data: {
                quantity: newQuantity
            }
        });

        await tx.stockHistory.create({
            data: {
                inventoryId: id,
                action: inventory.action,
                lastQuantity: lastQuantity,
                currentQuantity: newQuantity,
                newQuantity: updateInventory.quantity
            }
        })

        const fullInventory = await tx.inventory.findUnique({
            where: { id },
            include: {
                StockHistory: {
                    orderBy: { createdAt: 'desc' },
                },
            },
        });

        return fullInventory;

    })



    return updatedInventory;
};

const deleteInventory = async (id: string): Promise<Inventory | null> => {
    const deletedInventory = await prisma.$transaction(async (tx) => {
        const inventory = await tx.inventory.findUnique({
            where: { id }
        });

        if (!inventory) {
            throw new Error("Inventory not found");
        }

        await tx.stockHistory.deleteMany({
            where: { inventoryId: id }
        })

        const deletedInventory = await tx.inventory.delete({
            where: { id }
        });

        return deletedInventory;
    })

    return deletedInventory;
};

export const inventoryService = {
    createInventory,
    getAllInventories,
    getInventoryById,
    updateInventory,
    deleteInventory,
    getInventoryDetailsById
}