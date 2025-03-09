import root from "./routes/api";
import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", root.getRouter());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
