// ### 🛒 Endpoints de Productos (`/api/products`)

// | Método | Ruta    | Función                                      |
// | ------ | ------- | -------------------------------------------- |
// | GET    | `/`     | Obtener todos los productos                  |
// | GET    | `/:pid` | Obtener producto por ID                      |
// | POST   | `/`     | Crear nuevo producto (ID se autogenera)      |
// | PUT    | `/:pid` | Actualizar campos del producto excepto el ID |
// | DELETE | `/:pid` | Eliminar producto por ID                     |


import express from "express";
import productController from "../controllers/productController.js";

import { authJWT  } from "../middlewares/jwtMiddleware.js";
import { checkRole } from "../middlewares/checkRole.js";

const router = express.Router();

// 🛒 Endpoints de Productos

router.get("/", authJWT , productController.getAllProducts);
router.get("/:pid", authJWT , productController.getProductById);
router.post("/", authJWT , checkRole("admin"), productController.createProduct);
router.put("/:pid", authJWT , checkRole("admin"), productController.updatedProductById);
router.delete("/:pid", authJWT , checkRole("admin"), productController.deleteProductById);

export default router;