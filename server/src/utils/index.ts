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
    "Infosys",
  ];
  return stockNames[index];
}

function generateRandomPrice(min: number, max: number): number {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

export function generateStockData(numStocks: number): Stock[] {
  const stocks: Stock[] = [];

  for (let i = 0; i < numStocks; i++) {
    const stock: Stock = {
      name: getRandomStockName(i % 10),
      price: generateRandomPrice(100, 1500),
    };

    stocks.push(stock);
  }

  return stocks;
}
