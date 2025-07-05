import { Product } from "@prisma/client";
import prisma from "../../../prisma";
import axios from "axios";
import { config } from "../../../config";
import { IProductDetails } from "../../helpers/types";



const createProduct = async (product: Product): Promise<Product> => {


    const existingProduct = await prisma.product.findUnique({
        where: {
            sku: product.sku
        }
    })

    if (existingProduct) {
        throw new Error("Product with this SKU already exists");
    }


    const newProduct = await prisma.product.create({
        data: product
    })



    let inventory;
    try {
        const { data } = await axios.post(`${config.inventory_service_url}/inventory/`, {
            productId: newProduct.id,
            sku: newProduct.sku
        })
        inventory = data?.data;
    } catch (error) {
        await prisma.product.delete({ where: { id: newProduct.id } });
        throw new Error("Failed to create inventory for the product");
    }


    const updatedProduct = await prisma.product.update({
        where: {
            id: newProduct.id
        },
        data: {
            inventoryId: inventory?.id
        }
    })
    return updatedProduct;

};


const getAllProduct = async (): Promise<Product[]> => {
    const result = await prisma.product.findMany();
    return result;
}

const getProductById = async (id: string): Promise<IProductDetails | null> => {
    const result = await prisma.product.findUnique({
        where: { id }
    });

    if (!result) {
        throw new Error("Product not found");
    }


    let inventoryDetails;
    if (!result.inventoryId) {
        try {
            const { data } = await axios.post(`${config.inventory_service_url}/inventory/`, {
                productId: result.id,
                sku: result.sku
            })
            inventoryDetails = data?.data;
            await prisma.product.update({
                where: { id: result.id },
                data: { inventoryId: inventoryDetails?.id }
            })
        } catch (error) {
            console.log("Error creating inventory", error);
            throw new Error("Failed to create inventory");
        }


    } else {
        try {
            const { data } = await axios.get(`${config.inventory_service_url}/inventory/${result.inventoryId}/details`);
            inventoryDetails = data?.data;
        } catch (error) {
            throw new Error("Failed to fetch existing inventory");
        }
    }

    return {
        ...result,
        quantity: inventoryDetails?.quantity,
        stackStatus: inventoryDetails?.quantity > 0 ? "In-stack" : "Out-of-stack"
    }
}

export const productService = {
    createProduct,
    getAllProduct,
    getProductById
}