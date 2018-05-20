import * as express from 'express';
import { CreateGame } from './create_game';
import { AddLocalPlayer } from './add-local-player';

export class StartGame {
    public static addListeners(app: express.Express) {
        app.post('/create_game', CreateGame.post)
        app.post('/add_local_player', AddLocalPlayer.post);
    }
}