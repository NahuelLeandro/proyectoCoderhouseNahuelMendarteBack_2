// ### 🛒 Endpoints de Productos (`/api/products`)

// | Método | Ruta    | Función                                      |
// | ------ | ------- | -------------------------------------------- |
// | GET    | `/`     | Obtener todos los productos                  |
// | GET    | `/:pid` | Obtener producto por ID                      |
// | POST   | `/`     | Crear nuevo producto (ID se autogenera)      |
// | PUT    | `/:pid` | Actualizar campos del producto excepto el ID |
// | DELETE | `/:pid` | Eliminar producto por ID                     |

import { isAuthenticated, isAdmin } from "../middlewares/authMiddleware.js";
import { authJWT  } from "../middlewares/jwtMiddleware.js";

import express from "express";
import productController from "../controllers/productController.js";

const router = express.Router();

// 🛒 Endpoints de Productos
//router.get("/", isAuthenticated, productController.renderProductsView);
router.get("/", productController.getAllProducts);
router.get("/:pid", productController.getProductById);
router.post("/", authJWT , productController.createProduct);
router.put("/:pid", authJWT , productController.updatedProductById);
router.delete("/:pid", authJWT , productController.deleteProductById);

export default router;