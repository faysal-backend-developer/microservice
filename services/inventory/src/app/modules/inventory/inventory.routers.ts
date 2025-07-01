import { Router } from "express";
import { inventoryController } from "./inventory.controller";
import zodValidation from "../../helpers/zodValidation";
import { inventoryZodSchema } from "./inventory.schema";

const router = Router();


router.post("/", zodValidation(inventoryZodSchema.createInventoryZodSchema), inventoryController.createInventory);
router.get("/", inventoryController.getAllInventories);
router.get("/:id/details", inventoryController.getInventoryDetailsById);
router.get("/:id", inventoryController.getInventoryById);
router.patch("/:id", zodValidation(inventoryZodSchema.updateInventoryZodSchema), inventoryController.updateInventory);
router.delete("/:id", inventoryController.deleteInventory);

export const inventoryRouter = router;