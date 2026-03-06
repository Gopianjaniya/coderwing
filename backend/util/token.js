import jwt from "jsonwebtoken";

export const createToken = (payload) => {
    try {
        const token = jwt.sign({ payload }, process.env.SECRET_KEY, {
            expiresIn: "1h",
        });
        return token;
    } catch (error) {}
};