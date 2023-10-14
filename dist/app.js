"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
function generateJSONData() {
    return {
        message: 'This is a JSON data stream',
        timestamp: new Date().toLocaleString(),
    };
}
app.get('/stream-json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.write('[');
    let firstData = true;
    const interval = setInterval(() => {
        if (!firstData) {
            res.write(',');
        }
        firstData = false;
        const jsonData = generateJSONData();
        res.write(JSON.stringify(jsonData));
        res.write('\n');
        // Send the response immediately
        res.flushHeaders();
    }, 1000);
    setTimeout(() => {
        clearInterval(interval);
        res.write(']');
        res.end();
    }, 10000);
});
