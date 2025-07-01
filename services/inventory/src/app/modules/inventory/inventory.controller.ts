import { Request, Response } from "express";
import catchAsync from "../../helpers/catchAsync";
import sendResponse from "../../helpers/response";
import { inventoryService } from "./inventory.service";

const createInventory = catchAsync(async (req: Request, res: Response) => {
    const { ...payload } = req.body;
    const inventory = await inventoryService.createInventory(payload);

    if (!inventory) {
        throw new Error("Inventory creation failed");
    }
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Inventory created successfully",
        data: inventory
    })
})


const getAllInventories = catchAsync(async (_req: Request, res: Response) => {
    const inventories = await inventoryService.getAllInventories();

    if (!inventories) {
        throw new Error("No inventories found");
    }
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "All inventories retrieved successfully",
        data: inventories
    })
});


const getInventoryById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const inventory = await inventoryService.getInventoryById(id);

    if (!inventory) {
        throw new Error("Inventory not found");
    }
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Inventory retrieved successfully",
        data: inventory
    });
});
const getInventoryDetailsById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const inventory = await inventoryService.getInventoryDetailsById(id);

    if (!inventory) {
        throw new Error("Inventory not found");
    }
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Inventory retrieved successfully",
        data: inventory
    });
});

const updateInventory = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { ...payload } = req.body;
    const updatedInventory = await inventoryService.updateInventory(id, payload);

    if (!updatedInventory) {
        throw new Error("Inventory update failed or not found");
    }
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Inventory updated successfully",
        data: updatedInventory
    })
});


const deleteInventory = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedInventory = await inventoryService.deleteInventory(id);

    if (!deletedInventory) {
        throw new Error("Inventory deletion failed or not found");
    }
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Inventory deleted successfully",
        data: deletedInventory
    })
});

export const inventoryController = {
    createInventory,
    getAllInventories,
    getInventoryById,
    updateInventory,
    deleteInventory,
    getInventoryDetailsById
};
