import express from "express";
import passport from "passport";

import { UserModel } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../middlewares/jwtMiddleware.js";



const router = express.Router();

// ✅ Registro con Passport
router.post(
    "/register",
    passport.authenticate("register", {
        failureRedirect: "/user/register-fail", // si falla, va acá
        successRedirect: "/user/login"          // si sale bien, va al login
    })
);

// ✅ Login con Passport
router.post(
    "/login",
    passport.authenticate("login", {
        failureRedirect: "/user/login-fail",
        successRedirect: "/api/products"
    })
);

// ✅ Logout
router.get("/logout", (req, res) => {
    req.logout(err => {
        if (err) {
        console.error("Error al cerrar sesión:", err);
        return res.status(500).send("Error al cerrar sesión");
        }
        res.clearCookie("connect.sid");
        res.redirect("/user/login");
    });
});

// ✅ Mostrar formularios y vistas
router.get("/register", (req, res) => {
    res.render("pages/register", { title: "Registro" });
});

router.get("/login", (req, res) => {
    res.render("pages/login", { title: "Iniciar sesión" });
});

router.get("/register-fail", (req, res) => {
    res.render("pages/registerFail", { title: "Error en registro" });
});

router.get("/login-fail", (req, res) => {
    res.render("pages/loginFail", { title: "Error en login" });
});

// ✅ Home
router.get("/home", (req, res) => {
    res.render("pages/home", {
        title: "Inicio",
        user: req.user  // Passport mete al usuario logueado acá
    });
});


// ======================
//  REGISTRO CON JWT
// ======================
router.post("/api/registerJWT", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const exists = await UserModel.findOne({ email });
        if (exists) return res.status(400).json({ error: "Usuario ya existe" });

        const hashed = await bcrypt.hash(password, 10);

        const user = await UserModel.create({
            name,
            email,
            password: hashed,
            role: role || "user"
        });

        res.json({ message: "Usuario registrado", user });
    } catch (err) {
        res.status(500).json({ error: "Error en registro" });
    }
});

// ======================
//  LOGIN CON JWT
// ======================
router.post("/api/login-JWT", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });
        if (!user) return res.status(400).json({ error: "Usuario no encontrado" });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(400).json({ error: "Contraseña incorrecta" });

        const token = generateToken(user);

        res.json({
            message: "Login correcto",
            token, 
            user: {
                id: user._id,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        res.status(500).json({ error: "Error al hacer login" });
    }
});




export default router;