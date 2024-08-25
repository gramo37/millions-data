"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default.Router();
function getRandomStockName(index) {
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
function generateRandomPrice(min, max) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}
function generateStockData(numStocks) {
    const stocks = [];
    for (let i = 0; i < numStocks; i++) {
        const stock = {
            name: getRandomStockName(i % 10),
            price: generateRandomPrice(100, 1500),
        };
        stocks.push(stock);
    }
    return stocks;
}
app.get("/data", async (req, res) => {
    console.log("Generating Data");
    console.time("Data Generation Time");
    const data = generateStockData(10000);
    //   const data = generateRandomData(1_000_00);
    console.timeEnd("Data Generation Time");
    res.json(data);
});
exports.default = app;
