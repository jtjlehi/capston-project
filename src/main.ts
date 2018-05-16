import * as express from 'express';
import { StartGame } from "./start/start";
import * as bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

StartGame.addListeners(app);

app.listen(3000, () => console.log('Example app listening on port 3000!'));