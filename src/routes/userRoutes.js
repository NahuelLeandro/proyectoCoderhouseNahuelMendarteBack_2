import express from "express";
import passport from "passport";

import { UserModel } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken , authJWT } from "../middlewares/jwtMiddleware.js";



const router = express.Router();

// // ✅ Registro con Passport
// router.post(
//     "/register",
//     passport.authenticate("register", {
//         failureRedirect: "/user/register-fail", // si falla, va acá
//         successRedirect: "/user/login"          // si sale bien, va al login
//     })
// );

// // ✅ Login con Passport
// router.post(
//     "/login",
//     passport.authenticate("login", {
//         failureRedirect: "/user/login-fail",
//         successRedirect: "/api/products"
//     })
// );

// // ✅ Logout
// router.get("/logout", (req, res) => {
//     req.logout(err => {
//         if (err) {
//         console.error("Error al cerrar sesión:", err);
//         return res.status(500).send("Error al cerrar sesión");
//         }
//         res.clearCookie("connect.sid");
//         res.redirect("/user/login");
//     });
// });

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



// Detecta si el cliente quiere JSON (Postman) o HTML (navegador)
function quiereJSON(req) {
    return req.xhr ||
        req.headers["postman-token"] ||
        (req.headers.accept && req.headers.accept.includes("application/json"));
}

// ======================
//  REGISTRO CON JWT
// ======================
router.post("/api/registerJWT", async (req, res) => {
    try {
        const { first_name, last_name, email, password, role } = req.body;

        const exists = await UserModel.findOne({ email });
        if (exists) {
            if (quiereJSON(req)) return res.status(400).json({ error: "Usuario ya existe" });
            return res.status(400).send("Usuario ya existe");
        }

        const hashed = await bcrypt.hash(password, 10);

        const user = await UserModel.create({
            first_name,
            last_name,
            email,
            password: hashed,
            role: role || "user"
        });

        if (quiereJSON(req)) {
            return res.json({ message: "Usuario registrado", user });
        }

        res.redirect("/user/login");

    } catch (err) {
        if (quiereJSON(req)) return res.status(500).json({ error: "Error en registro" });
        res.status(500).send("Error en registro");
    }
});

// ======================
//  LOGIN CON JWT
// ======================
router.post("/api/login-JWT", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });
        if (!user) {
            if (quiereJSON(req)) return res.status(400).json({ error: "Usuario no encontrado" });
            return res.status(400).send("Usuario no encontrado");
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            if (quiereJSON(req)) return res.status(400).json({ error: "Contraseña incorrecta" });
            return res.status(400).send("Contraseña incorrecta");
        }

        const token = generateToken(user);

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        // ============
        // POSTMAN JSON
        // ============
        if (quiereJSON(req)) {
            return res.json({
                message: "Login correcto",
                token,
                user: {
                    id: user._id,
                    email: user.email,
                    role: user.role
                }
            });
        }

        // ============
        // NAVEGADOR
        // ============
        res.redirect("/user/homeJWT");

    } catch (err) {
        if (quiereJSON(req)) return res.status(500).json({ error: "Error al hacer login" });
        res.status(500).send("Error al hacer login");
    }
});


router.get("/api/ruta_protegida-JWT", authJWT, (req, res) => {
    if (quiereJSON(req)) {
        return res.json({
            message: "Ruta JWT OK",
            user: req.user
        });
    }

    res.send("Accediste a una ruta protegida con JWT, usuario: " + req.user.email);
});


router.get("/homeJWT", authJWT, (req, res) => {
    res.render("pages/homeJWT", {
        title: "Home JWT",
        user: req.user
    });
});

router.get("/logoutJWT", (req, res) => {
    res.clearCookie("token");

    if (quiereJSON(req)) {
        return res.json({ message: "Logout correcto" });
    }

    res.redirect("/user/login");
});






export default router;