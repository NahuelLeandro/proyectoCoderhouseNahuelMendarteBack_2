// config/passport2.config.js
import passport from "passport";
import { UserModel } from "../models/userModel.js";
import jwt from "passport-jwt";

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

/** 
 * EXTRAER TOKEN DESDE EL HEADER Authorization: Bearer xxx
 */
const headerExtractor = (req) => {
    let token = null;
    if (req && req.headers && req.headers.authorization) {
        const parts = req.headers.authorization.split(" ");
        if (parts.length === 2) token = parts[1];
    }
    return token;
};

const initializePassport = () => {
    passport.use(
        "jwt",
        new JWTStrategy(
            {
                jwtFromRequest: ExtractJWT.fromExtractors([headerExtractor]),
                secretOrKey: "coderSecret",
            },
            async (jwtPayload, done) => {
                try {
                    return done(null, jwtPayload);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );

    // Serialización estándar (no se usa en JWT, pero el curso lo pone)
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await UserModel.findById(id);
        done(null, user);
    });
};

export default initializePassport;