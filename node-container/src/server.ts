import express from 'express';
import os from 'os';

// Constants
const PORT = 8080;
const HOST = "0.0.0.0";

const osInfo = `OS: ${os.type()} Release: ${os.release()} HostName: ${os.hostname()}`;

// App
const app = express();
app.get("/", (_req, res) => {
    res.send(`<div>Hello from a windows container!</br>${osInfo}</div>`);
});

app.listen(PORT, HOST);

console.log(osInfo);
console.log(`Running on http://${HOST}:${PORT}`);