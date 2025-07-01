import { Request, Response } from "express";
import catchAsync from "../../helpers/catchAsync";
import { productService } from "./product.service";
import sendResponse from "../../helpers/response";
import { IProductDetails } from "../../helpers/types";
import { Product } from "@prisma/client";

const createProduct = catchAsync(async (req: Request, res: Response) => {
    const { ...payload } = req.body;
    const product = await productService.createProduct(payload);

    sendResponse<Product>(res, {
        statusCode: 201,
        success: true,
        message: "Product created successfully",
        data: product
    })
});


const getAllProduct = catchAsync(async (_req: Request, res: Response) => {
    const result = await productService.getAllProduct();
    sendResponse<Product[]>(res, {
        statusCode: 200,
        success: true,
        message: "Products retrieved successfully",
        data: result
    });
});

const getProductById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await productService.getProductById(id);
    sendResponse<IProductDetails>(res, {
        statusCode: 200,
        success: true,
        message: "Product retrieved successfully",
        data: result
    })
})


export const productController = {
    createProduct,
    getAllProduct,
    getProductById
}