import express from "express";
import userRoutes from "./../routes/userRoutes";

const app = express();
const port = process.env.PORT || 3000;

app.use("/", userRoutes);

console.log(userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
