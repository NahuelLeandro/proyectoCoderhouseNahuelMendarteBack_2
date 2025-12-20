import express from "express";
import userController from "../controllers/userController.js";
import { authJWT } from "../middlewares/jwtMiddleware.js";

const router = express.Router();

// AUTH
router.post("/api/registerJWT", userController.register);
router.post("/api/login-JWT", userController.login);
router.post("/api/logoutJWT", userController.logout);

// PROTEGIDA
router.get("/api/ruta_protegida-JWT", authJWT, userController.protectedRoute);

export default router;