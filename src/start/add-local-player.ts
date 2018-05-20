import * as express from 'express';

import { LocalPlayerResponse, ErrorMessage } from "../typings/response-types";
import { GamePlayer } from '../typings/player-types';
import { Player } from './player_class';

export class AddLocalPlayer {
    public static async post (
        req: express.Request,
        res: express.Response
    ): Promise<GamePlayer | ErrorMessage> {
        let errorMessage: ErrorMessage;
        if (!req.body.player || !req.body.player) {
            errorMessage = {
                errorCode: 406,
                message: "you must specify a player and game"
            }
            res.status(406);
            res.send(errorMessage);
            return errorMessage;
        } try {
            let player: GamePlayer = new Player(req.body.player);
            res.status(201);
            res.send({
                game: req.body.game,
                player: player
            });
            return player;
        } catch(err) {
            errorMessage = {
                errorCode: 406,
                message: 'unknown error occurred'
            }
            res.status(406);
            res.send(errorMessage);
            return errorMessage;
        }
    }
}