// ### 🧺 Endpoints de Carritos (`/api/carts`)
//
// | Método | Ruta                            | Función                                                |
// | ------ | ------------------------------- | ------------------------------------------------------ |
// | POST   | `/`                             | Crear nuevo carrito                                   |
// | GET    | `/:cid`                         | Obtener todos los productos del carrito               |
// | POST   | `/:cid/product/:pid`            | Agregar producto al carrito                           |
// | DELETE | `/:cid/products/:pid`           | Eliminar un producto específico del carrito           |
// | PUT    | `/:cid/products/:pid`           | Actualizar cantidad de un producto específico         |
// | PUT    | `/:cid`                         | Reemplazar el contenido completo del carrito          |
// | DELETE | `/:cid`                         | Vaciar completamente un carrito                       |

import express from "express";
import cartController from "../controllers/cartController.js";

const router = express.Router();

// 🧺 Endpoints de Carritos
router.post("/", cartController.createCart);
router.get("/:cid", cartController.getCartById);
router.post("/:cid/product/:pid", cartController.addProductToCart);
router.delete("/:cid/products/:pid", cartController.deleteProductFromCart);
router.put("/:cid/products/:pid", cartController.updateProductQuantity);
router.put("/:cid", cartController.replaceCartProducts);
router.delete("/:cid", cartController.clearCart);

export default router;