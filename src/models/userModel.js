import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: { type: String, unique: true },
    password: String, // Encriptada con bcrypt
    role: { type: String, default: "user" }
});

export const UserModel = mongoose.model("User", userSchema);