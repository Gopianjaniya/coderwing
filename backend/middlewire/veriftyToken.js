import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const { token } = req.headers;

    try {
        const decode_token = jwt.verify(token, process.env.SECRET_KEY);
        req.body = decode_token;
        next();
    } catch (error) {}
};