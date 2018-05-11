import * as express from 'express';
import { CreateGame } from './create_game';

export class StartGame {
    public static addListeners(app: express.Express) {
        app.post('/create_game', CreateGame.post)
    }
}