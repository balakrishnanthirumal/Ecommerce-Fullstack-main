import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "../backend/routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
dotenv.config();
import orderRoutes from "./routes/orderRoutes.js";
const port = process.env.PORT || 3000;

connectDB();

const app = express();
// app.use(
//   cors({
//     origin: ["https://ecommerce-fullstack-abb1.vercel.app/"],
//     methods: ["POST", "PUT", "DELETE", "GET"],
//     credentials: true,
//   })
// );
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

app.listen(port, () => {
  console.log(`Server is running on the port: ${port}`);
});
