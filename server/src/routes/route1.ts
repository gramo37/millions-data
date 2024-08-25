import express, { Request, Response } from "express";
import { generateStockData } from "../utils";

const app = express.Router();

app.get("/data", async (req: Request, res: Response) => {
  console.log("Generating Data");
  console.time("Data Generation Time");
  const data = generateStockData(10000);
  console.timeEnd("Data Generation Time");
  res.json(data);
});

export default app;
