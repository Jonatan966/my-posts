import express from "express";

const port = process.env.port || 3000;

const app = express();

app.use(express.json());

app.listen(port, () => console.log("app started on", port));
