import express from "express";
import cors from "cors";
import userRoute from "./interface/UserRoute";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/user", userRoute);
app.get("/healthcheck", (req, res) => {
  res.send("Health Check");
});

export default app;
