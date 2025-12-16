import express from "express";
import http from "http";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";

import indexRoutes from "./routes/indexRoutes.js";
import { paths } from "./config/config.js";
import connectMongo from "./config/mongoConfig.js";
import setupHandlebars from "./config/hbsConfig.js";
import initSocket from "./config/socketConfig.js";
//import initializePassport from "./config/passport.config.js";


import initializePassport from "./config/passport2.config.js";

dotenv.config();

// Inicialización
const app = express();
const server = http.createServer(app);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(paths.public));

// Handlebars
setupHandlebars(app, paths);

// MongoDB
connectMongo(process.env.MONGO_URI);


// Socket.IO
const io = initSocket(server);



// Cookies y sesión
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
    session({
        secret: "secreto",
        resave: true,
        saveUninitialized: true,
        cookie: { 
            maxAge: 24 * 60 * 60 * 1000, // 1 día
            httpOnly: true 
        }
    })
);


//Passport
initializePassport()
app.use(passport.initialize())
app.use(passport.session())



// Rutas principales
app.use("/", indexRoutes);

// 404 Handler
app.use((req, res) => {
    console.log("❌ Ruta no encontrada:", req.method, req.url);
    res.status(404).send("Ruta no encontrada");
});





export { app, server };