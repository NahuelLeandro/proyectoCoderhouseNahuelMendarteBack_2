import { UserModel } from "../models/userModel.js";

class UserDao {

    getByEmail(email) {
        return UserModel.findOne({ email });
    }

    create(userData) {
        return UserModel.create(userData);
    }
}

export default new UserDao();