import express from "express";
import "dotenv/config";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

import { apiRouter } from "./routes/apiRoutes.js";

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://netflix-clone-chanalston.vercel.app/",
      "https://netflix-clone-alstonchan.vercel.app/",
    ],
  })
);

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.end("hi");
});

app.use("/api", apiRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Running on PORT ${port}`);
});
