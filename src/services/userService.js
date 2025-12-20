import bcrypt from "bcryptjs";
import userDao from "../dao/userDao.js";
import { generateToken } from "../middlewares/jwtMiddleware.js";

class UserService {

    async register(data) {
        const { first_name, last_name, email, password, role } = data;

        if (!email || !password) {
            throw new Error("Email y contraseña son obligatorios");
        }

        const exists = await userDao.getByEmail(email);
        if (exists) {
            throw new Error("Usuario ya existe");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        return userDao.create({
            first_name,
            last_name,
            email,
            password: hashedPassword,
            role: role || "user"
        });
    }

    async login(email, password) {
        const user = await userDao.getByEmail(email);
        if (!user) {
            throw new Error("Usuario no encontrado");
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new Error("Contraseña incorrecta");
        }

        const token = generateToken(user);

        return { user, token };
    }
}

export default new UserService();