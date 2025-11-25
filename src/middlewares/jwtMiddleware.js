import jwt from "jsonwebtoken";

export function generateToken(user) {
    return jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
    );
}

export function authJWT(req, res, next) {

    let token = null;

    // 1️⃣ Buscar token en header Authorization (POSTMAN)
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
    }

    // 2️⃣ Buscar token en cookies firmadas (NAVEGADOR SEGURO)
    if (!token && req.signedCookies?.token) {
        token = req.signedCookies.token;
    }

    // 3️⃣ Buscar token en cookies NO firmadas (compatibilidad opcional)
    if (!token && req.cookies?.token) {
        token = req.cookies.token;
    }

    // 4️⃣ Si sigue sin haber token → No autorizado
    if (!token) {
        return res.status(401).json({ error: "Token no enviado" });
    }

    // 5 Verificar token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ error: "Token inválido" });

        req.user = decoded;
        next();
    });
}