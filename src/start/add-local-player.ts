import * as express from 'express';

import { LocalPlayerResponse, ErrorMessage } from "../typings/response-types";
import { GamePlayer } from '../typings/player-types';
import { Player } from './player_class';
import { GameDB } from '../database/game-db';

export class AddLocalPlayer {
    private static _gameDB = new GameDB();
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
        } if (req.body.computer !== undefined) {
            errorMessage = {
                errorCode: 406,
                message: "computer player mode has not been made yet"
            }
            res.status(406);
            res.send(errorMessage);
            return errorMessage;
        } try {
            let player: GamePlayer = await AddLocalPlayer._gameDB.addLocalPlayer(req.body.game, req.body.player);
            res.status(201);
            res.send({
                game: req.body.game,
                player: player
            });
            return player;
        } catch (err) {
            errorMessage = {
                errorCode: 406,
                message: err.message
            }
            res.status(406);
            res.send(errorMessage);
            return errorMessage;
        }
    }
}