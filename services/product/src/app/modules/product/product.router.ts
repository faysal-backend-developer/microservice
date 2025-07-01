import { Router } from "express";
import zodValidation from "../../helpers/zodValidation";
import { productSchema } from "./product.zodSchema";
import { productController } from "./product.controller";

const productRouter = Router();

productRouter.post("/", zodValidation(productSchema.createProductSchema), productController.createProduct);
productRouter.get("/", productController.getAllProduct);
productRouter.get("/:id", productController.getProductById);

export default productRouter;