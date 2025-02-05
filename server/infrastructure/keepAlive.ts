import mongoose from "mongoose";
import axios from "axios";
import { PROD_URL } from "../config/env";

const keepDBAlive = async () => {
  try {
    const db = mongoose.connection;
    await db.collection("users").findOne({});
    console.log("Keep-alive query executed successfully.");
  } catch (error) {
    console.error("Error in keep-alive DB query:", error);
  }
};

const keepBackendAlive = async () => {
  try {
    await axios.get(`${PROD_URL}/healthcheck`);
    console.log("Backend keep-alive request executed successfully.");
  } catch (error) {
    console.error("Error executing backend keep-alive request:", error);
  }
};

export const runWarmUp = () => {
  keepDBAlive();
  keepBackendAlive();
};

setInterval(runWarmUp, 300000);
