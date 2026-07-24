import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/error.middleware.js";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import videoRoutes from "./routes/video.route.js"
import skillRequestRoutes from "./routes/skillRequest.route.js";
const app = express();

// middleware configs
// all the middlewares that has been configured for the program is here
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));

//server running check route default route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Server Running 🚀"
    });
});

//route setup codes 

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/video",videoRoutes);
app.use("/api/skill-request", skillRequestRoutes);


// 404 route not found handler || invalid routes
// app.use("*", (req, res) => {
//     res.status(404).json({
//         success: false,
//         message: "Route Not Found"
//     });
// });

app.use(errorHandler);

export default app;