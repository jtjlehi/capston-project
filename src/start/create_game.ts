import * as express from 'express';
import { CreateGameObj } from './../typings/requests-types';
import { GameType } from './../typings/game-types';
import { NewGameResponseBody, ErrorMessage } from './../typings/response-types';
import { GameDB } from './game-db';

export class CreateGame {
    private static _gameDB = new GameDB();
    public static post = async (
        req: express.Request,
        res: express.Response
    ): Promise<NewGameResponseBody | ErrorMessage> => {
        const body: CreateGameObj = req.body;
        let responseObj: NewGameResponseBody | ErrorMessage | undefined;
        let savedData: Promise<boolean>;
        if (!(body.name && (body.type || body.type === 0) && (body.playerCount || body.playerCount === 0))) {
            res.status(400);
            responseObj = {
                errorCode: 400,
                message: "Request body must contain name, playerCount, and body"
            }
        } else {
            try {
                responseObj = await CreateGame._gameDB.addGame(body);
                res.status(201);
            } catch (err) {
                responseObj = {
                    errorCode: 406,
                    message: err.message
                }
                res.status(406);
            }
        } 
        res.send(JSON.stringify(responseObj));
        return responseObj;
    }
}