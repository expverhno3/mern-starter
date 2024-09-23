import express from "express";
import { connectDB } from "./config/db.js";
import router from "./routes/product.route.js";
import path from "path";

const app = express();

app.use(express.json()); // to accept json data

app.use("/api/products", router);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist"))); // use dist folder as a static asset

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(process.env.PORT, () => {
  connectDB();
  console.log("Server is running on http://localhost:" + process.env.PORT);
});
