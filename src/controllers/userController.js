import userService from "../services/userService.js";

class UserController {

    async register(req, res) {
        try {
            const user = await userService.register(req.body);
            res.status(201).json({
                status: "success",
                message: "Usuario registrado",
                payload: user
            });
        } catch (error) {
            res.status(400).json({
                status: "error",
                message: error.message
            });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;

            const { user, token } = await userService.login(email, password);

            res.cookie("token", token, {
                httpOnly: true,
                signed: true,
                maxAge: 24 * 60 * 60 * 1000
            });

            res.json({
                status: "success",
                message: "Login correcto",
                token,
                user: {
                    id: user._id,
                    email: user.email,
                    role: user.role
                }
            });

        } catch (error) {
            res.status(401).json({
                status: "error",
                message: error.message
            });
        }
    }

    async protectedRoute(req, res) {
        res.json({
            status: "success",
            message: "Ruta protegida JWT OK",
            user: req.user
        });
    }

    async logout(req, res) {
        res.clearCookie("token");
        res.json({
            status: "success",
            message: "Logout correcto"
        });
    }
}

export default new UserController();