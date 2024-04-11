import express, {Application, Request, Response} from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(bodyParser.json());
app.disable("x-powered-by");
app.set('trust proxy', true);

const api_version = require("routes/" + process.env.API_VERSION);


Object.keys(api_version).forEach(function(key, index) {
    console.log(key)
    app.use("/api/" + process.env.API_VERSION + "/", api_version[key]);
});

app.get("/", async (req: Request, res: Response) => {
    res.status(200).send("Hello World!");
});

export default app;

