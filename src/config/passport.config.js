import passport from "passport";
import local from "passport-local";
import { UserModel } from "../models/userModel.js";
import { createHash, isValidPassword } from "../utils/utils.js";

const LocalStrategy = local.Strategy;

const initializePassport = () => {
    // 🔹 Estrategia de Registro
    passport.use(
        "register",
        new LocalStrategy(
        {
            passReqToCallback: true,
            usernameField: "email",
        },
        async (req, username, password, done) => {
            const { first_name, last_name, role } = req.body;
            try {
            const existingUser = await UserModel.findOne({ email: username });
            if (existingUser) {
                console.log("⚠️ El usuario ya existe");
                return done(null, false);
            }

            const newUser = await UserModel.create({
                first_name,
                last_name,
                email: username,
                password: createHash(password),
                role: role || "user", // si no viene, será "user" por defecto
            });

            console.log("✅ Usuario registrado:", newUser.email);
            return done(null, newUser);
            } catch (error) {
            console.error("❌ Error al registrar usuario:", error);
            return done(error);
            }
        }
        )
    );

    // 🔹 Estrategia de Login
    passport.use(
        "login",
        new LocalStrategy(
        { usernameField: "email" },
        async (username, password, done) => {
            try {
            const user = await UserModel.findOne({ email: username });
            if (!user) {
                console.log("⚠️ Usuario no encontrado");
                return done(null, false);
            }

            if (!isValidPassword(user, password)) {
                console.log("❌ Contraseña incorrecta");
                return done(null, false);
            }

            console.log("✅ Login exitoso:", user.email, "-", user.role);
            return done(null, user);
            } catch (error) {
            console.error("❌ Error durante login:", error);
            return done(error);
            }
        }
        )
    );

    // 🔹 Serialización y deserialización
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
        const user = await UserModel.findById(id);
        done(null, user);
        } catch (error) {
        done(error);
        }
    });

    console.log("✅ Passport inicializado correctamente");
};

export default initializePassport;