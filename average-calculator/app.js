import express from "express";
import numbersRoute from "./routes/numbersRoute.js";

const app = express();
const PORT = 9876;

app.use("/numbers", numbersRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
