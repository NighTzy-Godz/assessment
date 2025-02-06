require("dotenv").config();
import app from "./app";
import { PORT } from "./config/env";
import connectToDB from "./infrastructure/connectToDB";
import { runWarmUp } from "./infrastructure/keepAlive";

connectToDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  runWarmUp();
});
