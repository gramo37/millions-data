import express, { Request, Response } from "express";

const app = express.Router();

type Stock = {
  name: string;
  price: number;
};

function getRandomStockName(index: number): string {
  const stockNames = [
    "Apple",
    "Microsoft",
    "Google",
    "Amazon",
    "Facebook",
    "Tesla",
    "Reliance",
    "Hindustan Unilever",
    "TCS",
    "Infosys"
  ];
  return stockNames[index];
}

function generateRandomPrice(min: number, max: number): number {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

function generateStockData(numStocks: number): Stock[] {
  const stocks: Stock[] = [];

  for (let i = 0; i < numStocks; i++) {
    const stock: Stock = {
      name: getRandomStockName(i%10),
      price: generateRandomPrice(100, 1500),
    };

    stocks.push(stock);
  }

  return stocks;
}

app.get("/data", async (req: Request, res: Response) => {
  console.log("Generating Data");
  console.time("Data Generation Time");
  const data = generateStockData(10000);
//   const data = generateRandomData(1_000_00);
  console.timeEnd("Data Generation Time");
  res.json(data);
});

export default app;
