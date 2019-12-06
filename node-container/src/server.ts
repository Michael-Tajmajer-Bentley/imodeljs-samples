import express from 'express';

// Constants
const PORT = 8080;
const HOST = "0.0.0.0";

// App
const app = express();
app.get("/", (_req, res) => {
    res.send("Hello from a container!\n");
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);