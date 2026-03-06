import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./config/config.db.js";
import userRouter from "./routes/user.router.js";
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("<h1>Hello, Express.js Server!</h1>");
});

app.use("/api/user", userRouter);

connectDB();
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});