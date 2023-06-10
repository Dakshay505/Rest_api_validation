import express from "express";
import config from "config";
import connectdb from "./utils/connectdb";
import logger from "./utils/logger";
import routes from "./routes";
import { deserializeUser } from "./middleware/deserializeuser";

const port  = config.get<number>('port');

const app = express();


app.use(express.json());
app.use(deserializeUser);

routes(app);


app.listen(port,async ()=>{
    await connectdb();
    logger.info(`server is running on port http://localhost:${port}`)
})