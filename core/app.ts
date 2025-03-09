import express from "express";
import userRoutes from "./../routes/userRoutes";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use("/", userRoutes);

console.log(userRoutes);

export default app;
