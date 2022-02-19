import express from "express";
import { fetchMovie } from "../controller/apiController.js";

export const apiRouter = express.Router();

apiRouter.post("/fetchmovie", fetchMovie);
