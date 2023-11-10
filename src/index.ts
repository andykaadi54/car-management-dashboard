import express, { Express, Request, Response } from "express";
const setupDb = require("./db/db-setup");
const carRouter = require("./routes/car-router");

const app: Express = express();
const port = process.env.PORT || 5000;

setupDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", carRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("typescript server run...");
});

app.listen(port, () => console.log(`app listen pn http://localhost:${port}`));
