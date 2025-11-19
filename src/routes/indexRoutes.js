
import express from "express";
import productsRouter from "./productsRoutes.js";
import cartsRouter from "./cartRoutes.js";
import viewsRouter from "./views.js";
import userRouters from "./userRoutes.js"
import pruebasRoutes from "./pruebasRutes.js"

const router = express.Router();

router.use("/api/products", productsRouter);
router.use("/api/carts", cartsRouter);
router.use("/views", viewsRouter);
router.use("/user", userRouters);
router.use("/pruebas" , pruebasRoutes)



// Redirigir la raíz a home
router.get("/", (req, res) => {
    res.redirect("/user/home");
});


export default router;