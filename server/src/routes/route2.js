"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const crypto_1 = __importDefault(require("crypto"));
const stream_1 = require("stream");
const app = express_1.default.Router();
// Utility function to create a readable stream of random data
const createRandomDataStream = (count) => {
    let currentIndex = 0;
    return new stream_1.Readable({
        objectMode: true,
        read() {
            if (currentIndex < count) {
                const obj = {};
                for (let j = 0; j < 10; j++) {
                    const key = `key${j}`;
                    obj[key] = crypto_1.default.randomBytes(4).toString("hex");
                }
                obj["id"] = currentIndex + 1;
                currentIndex++;
                this.push(JSON.stringify(obj) + (currentIndex < count ? "," : ""));
            }
            else {
                this.push(null); // End the stream
            }
        },
    });
};
app.get("/data", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.write("[");
    console.time("Data Generation Time2");
    const stream = createRandomDataStream(100000);
    stream.pipe(res, { end: false });
    stream.on("end", () => {
        res.end("]");
        console.timeEnd("Data Generation Time2");
    });
});
exports.default = app;
