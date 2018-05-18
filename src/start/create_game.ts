import * as express from 'express';
import { CreateGameObj } from './typings/create_game_obj-interface';
import { GameType } from './typings/game_type-enum';
import { NewGameResponseBody } from './typings/new-game-response_interface';
import { ErrorMessage } from './typings/error-response_interface';

export class CreateGame {
    public static post(req: express.Request, res: express.Response) {
        const body: CreateGameObj = req.body;
        let responseObj: NewGameResponseBody | ErrorMessage | undefined;
        if (!(body.name && (body.type || body.type === 0) && (body.playerCount || body.playerCount === 0))) {
            res.status(400);
            responseObj = {
                errorCode: 400,
                message: "Request body must contain name, playerCount, and body"
            }
        } else if (body.playerCount < 2) {
            res.status(406);
            responseObj = {
                errorCode: 406,
                message: "cannot have less then 2 players"
            }
        } else if (body.playerCount > 6) {
            res.status(406);
            responseObj = {
                errorCode: 406,
                message: "cannot have more then 6 players"
            }
        } else if (body.type === GameType.Online) {
            res.status(201);
            responseObj = {
                name: body.name,
                type: body.type,
                players: []
            }
            this._handleOnlineGame(body);
        } else if (body.type === GameType.Local) {
            res.status(201);
            responseObj = {
                name: body.name,
                type: body.type,
                players: []
            }
            this._handleLocalGame(body);
        } else {
            res.status(406);
            responseObj = {
                errorCode: 406,
                message: "property 'type' must be either 0 or 1"
            }
        }
        res.send(JSON.stringify(responseObj));
    }
    private static _handleOnlineGame(body: CreateGameObj){

    }
    private static _handleLocalGame(body: CreateGameObj) {

    }
}