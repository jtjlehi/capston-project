import * as express from 'express';
import { StartGame } from "./start/start";

const app = express();

StartGame.addListeners(app);

app.listen(3000, () => console.log('Example app listening on port 3000!'));