import { firestore, realTimeDatabase } from "./database";
import * as express from "express";
import * as cors from "cors";

const port = 3000;
const app = express();
app.use(express.json());
app.use(express.static("dist"));
app.use(cors());

app.listen(port, () => {
  console.log(`\nServer listen on port: \x1b[32m${port}\x1b[0m`);
});
