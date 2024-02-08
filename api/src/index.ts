import express, { Express, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import { setupDb } from "./db/db-setup";
import carRouter from "./routes/car-router";
import userRouter from "./routes/user-router";
import YAML from "yamljs";
import cors from "cors";

const app: Express = express();
const port = process.env.PORT || 3000;
const swaggerDocument = YAML.load("./openapi.yaml");

setupDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", carRouter);
app.use("/users", userRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req: Request, res: Response) => {
  res.send("typescript server run...");
});

app.listen(port, () => console.log(`app listen pn http://localhost:${port}`));

export default app;
