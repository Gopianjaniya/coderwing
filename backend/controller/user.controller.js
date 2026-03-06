import { UserModel } from "../models/User.model.js";
import bcrypt from "bcrypt";
import { createToken } from "../util/token.js";


// --------------------- Register Coontroller
const registerController = async(req, res) => {
    try {
        const { name, email, password } = req.body;
        const isExist = await UserModel.findOne({ email });

        if (isExist) {
            return res.json({ success: false, message: "User already exist" });
        } else {
            // ---------------- hass password
            const hashPassword = await bcrypt.hash(password, 10);

            const user = await UserModel.create({
                name,
                email,
                password: hashPassword,
            });


            if (!user) {
                res.status(401).json({ success: false, message: "user not create" });
            }

            // ------------------- Create Token
            const payloadData = { id: user._id, email: user.email };
            const token = await createToken(payloadData);

            res.status(200).json({ success: true, message: "User created", token });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
};
// --------------------- Login Coontroller
const loginController = async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.json({
                success: false,
                message: "User does not exist",
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({
                success: false,
                message: "Wrong password",
            });
        }
        // ------------------- Create Token

        const payloadData = { id: user._id, email: user.email };

        const token = await createToken(payloadData);

        return res
            .status(200)
            .json({ success: true, message: "Login successfully", token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

export { registerController, loginController };