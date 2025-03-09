import express from "express";
import userRoutes from "./../routes/userRoutes";

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use("/", userRoutes);

console.log(userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
