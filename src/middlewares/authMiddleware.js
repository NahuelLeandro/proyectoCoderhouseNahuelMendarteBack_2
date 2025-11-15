// export function isAuthenticated(req, res, next) {
//     if (!req.session.user) {
//         return res.status(401).send("Debes iniciar sesión");
//     }
//     next();
// }

// export function isAdmin(req, res, next) {
//     if (req.session.user?.role !== "admin") {
//         return res.status(403).send("Acceso denegado: solo admin");
//     }
//     next();
// }



// // Middleware para verificar si el usuario está autenticado
// export function isAuthenticated(req, res, next) {
//     // Passport agrega el método req.isAuthenticated()
//     if (!req.isAuthenticated || !req.isAuthenticated()) {
//         console.log("❌ Usuario no autenticado. Redirigiendo al login...");
//         return res.redirect("/user/login"); // Redirige si no hay sesión activa
//     }
//     next();
// }

// // Middleware para verificar si el usuario es admin
// export function isAdmin(req, res, next) {
//     // req.user es el usuario logueado que Passport guarda en la sesión
//     if (!req.user || req.user.role !== "admin") {
//         console.log("🚫 Acceso denegado: solo administradores");
//         return res.status(403).send("Acceso denegado: solo administradores");
//     }
//     next();
// }



export function isAuthenticated(req, res, next) {
    if (req.isAuthenticated() || req.session.user) {
        return next();
    }
    return res.status(401).send("Debes iniciar sesión");
}

export function isAdmin(req, res, next) {
    const user = req.user || req.session.user;

    if (!user) {
        return res.status(401).send("Debes iniciar sesión");
    }

    if (user.role !== "admin") {
        return res.status(403).send("Acceso denegado: solo administradores");
    }

    next();
}