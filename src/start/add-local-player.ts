import * as express from 'express';

import { LocalPlayerResponse } from "../typings/response-types";

export class AddLocalPlayer {
    public static post = async (
        req: express.Request,
        res: express.Response
    ): Promise<LocalPlayerResponse> => {
        throw new Error('AddLocalPlayer.post() not implemented yet');
    }
}