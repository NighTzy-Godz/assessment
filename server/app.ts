import express from "express";
import cors from "cors";
import userRoute from "./interface/UserRoute";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/user", userRoute);

export default app;
