import express, { Request, Response } from "express";
import crypto from "crypto";
import { Readable } from "stream";

const app = express.Router();

// Utility function to create a readable stream of random data
const createRandomDataStream = (count: number) => {
  let currentIndex = 0;

  return new Readable({
    objectMode: true,
    read() {
      if (currentIndex < count) {
        const obj: { [key: string]: any } = {};

        for (let j = 0; j < 10; j++) {
          const key = `key${j}`;
          obj[key] = crypto.randomBytes(4).toString("hex");
        }

        obj["id"] = currentIndex + 1;
        currentIndex++;
        this.push(JSON.stringify(obj) + (currentIndex < count ? "," : ""));
      } else {
        this.push(null); // End the stream
      }
    },
  });
};

app.get("/data", (req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  res.write("[");

  console.time("Data Generation Time2");
  const stream = createRandomDataStream(1_00_000);

  stream.pipe(res, { end: false });
  stream.on("end", () => {
    res.end("]");
    console.timeEnd("Data Generation Time2");
  });
});

export default app;
