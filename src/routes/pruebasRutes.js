// routes/pruevasRutes.js
import express from "express";
import jwt from "jsonwebtoken";
import passport from "passport";

// Middleware simple para probar Passport
const passportCall = (strategy) => (req, res, next) => {
    passport.authenticate(strategy, { session: false }, (err, user) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ error: "No autorizado" });
        req.user = user;
        next();
    })(req, res, next);
};

// Middleware de autorización por rol (solo prueba)
const authorization = (role) => (req, res, next) => {
    if (req.user.role !== role) {
        return res.status(403).json({ error: "Forbidden: Rol no válido" });
    }
    next();
};

const router = express.Router();

/** ---------------- LOGIN DE PRUEBA ------------------- */
router.post("/loginPruebas", (req, res) => {
    const { email, password } = req.body;

    if (email === "coder@coder.com" && password === "coderpass") {
        const token = jwt.sign(
            { email, role: "user" },
            "coderSecret",
            { expiresIn: "24h" }
        );

        return res.send({
            message: "Inicio de sesión exitoso",
            token,
        });
    }

    return res.status(400).json({ error: "Credenciales inválidas" });
});

/** ---------------- RUTA PROTEGIDA ------------------- */
router.get(
    "/current",
    passportCall("jwt"),
    authorization("user"),
    (req, res) => {
        res.send(req.user);
    }
);

export default router;