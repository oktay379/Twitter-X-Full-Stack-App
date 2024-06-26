import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary"; 

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js"; 
import postRoutes from "./routes/post.routes.js"; 
import notificationRoutes from "./routes/notification.routes.js"; 

import connectMongoDB from "./db/connectMongoDB.js";
dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();

app.use(express.json({limit: "5mb"})); // body yazilan değerleri almak icin kullanildi. limit 5mb verilerek yuklenecek olam img degerleri kolaylıkla yuklenir oldu, limit normalde 100kb boyutunda 
app.use(cookieParser()); // token gönderilen cookie değerini ayrıştırıp jwt verify etmek icin kullanilir.

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    connectMongoDB();
});