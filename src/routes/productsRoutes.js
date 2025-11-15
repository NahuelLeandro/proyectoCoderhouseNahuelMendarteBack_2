// ### 🛒 Endpoints de Productos (`/api/products`)

// | Método | Ruta    | Función                                      |
// | ------ | ------- | -------------------------------------------- |
// | GET    | `/`     | Obtener todos los productos                  |
// | GET    | `/:pid` | Obtener producto por ID                      |
// | POST   | `/`     | Crear nuevo producto (ID se autogenera)      |
// | PUT    | `/:pid` | Actualizar campos del producto excepto el ID |
// | DELETE | `/:pid` | Eliminar producto por ID                     |

import { isAuthenticated, isAdmin } from "../middlewares/authMiddleware.js";
import { verifyToken } from "../middlewares/jwtMiddleware.js";

import express from "express";
import productController from "../controllers/productController.js";

const router = express.Router();

// 🛒 Endpoints de Productos
//router.get("/", isAuthenticated, productController.renderProductsView);
router.get("/", verifyToken, productController.getAllProducts);
router.get("/:pid", verifyToken, productController.getProductById);
router.post("/", verifyToken, productController.createProduct);
router.put("/:pid", verifyToken, productController.updatedProductById);
router.delete("/:pid", verifyToken, productController.deleteProductById);

export default router;