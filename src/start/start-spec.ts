import * as request from "request";
import { Game } from "./typings/game-interface";
import { PlayerType } from "./typings/player_type-enum";
import { GameType } from "./typings/game_type-enum";
import { CreateGameObj } from "./typings/create_game_obj-interface";

const base_url: string = "http://localhost:3000";

interface newGameResponse {
    res: request.Response;
    body: {
        game?: Game;
        message?: string;
    }
}

const goodLocalGame1: CreateGameObj = {
    name: 'good local game',
    type: GameType.Local,
    playerCount: 3
};
const goodLocalGame2: CreateGameObj = {
    name: 'second good local game',
    type: GameType.Local,
    playerCount: 2
};
const badLocalGame1: CreateGameObj = {
    name: 'game with to few players',
    type: GameType.Local,
    playerCount: 1
};
const badLocalGame2: CreateGameObj = {
    name: 'My second game with to few players',
    type: GameType.Local,
    playerCount: 0
};
const badLocalGame3: CreateGameObj = {
    name: 'local game with to many players',
    type: GameType.Local,
    playerCount: 7
};
const goodOnlineGame: CreateGameObj = {
    name: 'My good online game',
    type: GameType.Online,
    playerCount: 4
}
const badOnlineGame1: CreateGameObj = {
    name: 'My online game with to few players',
    type: GameType.Online,
    playerCount: 1
};
const badOnlineGame2: CreateGameObj = {
    name: 'My online game with to few players',
    type: GameType.Online,
    playerCount: 7
};

function postNewGame(gameObj: CreateGameObj): Promise<{res:request.Response, body: any}> {
    return new Promise((resolve, reject) => {
        request.post({url: base_url + '/create_game', headers: gameObj}, (err, res, body) => {
            if (err) reject(err);
            else resolve({res: res, body: body});
        });
    });
}

describe("game", () => {
    describe('/create_game POST', () => {
        it("returns status code 201 on good local game", (done) => {
            postNewGame(goodLocalGame1)
            .then((resObj: newGameResponse) => {
                expect(resObj.res.statusCode).toBe(201);
            })
            .then(() => postNewGame(goodLocalGame2))
            .then((resObj: newGameResponse) => {
                expect(resObj.res.statusCode).toBe(201);
            })
            .catch(err => {
                fail(err);
            })
            .then(() => {
                done();
            });
        });
        it("returns status code 201 on good online game", (done) => {
            postNewGame(goodOnlineGame)
            .then((resObj: newGameResponse) => {
                expect(resObj.res.statusCode).toBe(201);
            })
            .catch(err => {
                fail(err);
            })
            .then(() => {
                done();
            });
        });
        it("returns new game object on good local game", (done) => {
            postNewGame(goodLocalGame1)
            .then((resObj: newGameResponse) => {
                expect(resObj.body.game)
                    .toEqual({
                        name: goodLocalGame1.name,
                        type: goodLocalGame1.type,
                        players: []
                    }
                );
            })
            .then(() => postNewGame(goodLocalGame2))
            .then((resObj: newGameResponse) => {
                expect(resObj.body.game)
                    .toEqual({
                        name: goodLocalGame2.name,
                        type: goodLocalGame2.type,
                        players: []
                    }
                );
            })
            .catch(err => {
                fail(err);
            })
            .then(() => {
                done();
            });
        });
        it("returns new game object on good online game", (done) => {
            postNewGame(goodOnlineGame)
            .then((resObj: newGameResponse) => {
                expect(resObj.body.game)
                    .toEqual({
                        name: goodOnlineGame.name,
                        type: goodOnlineGame.type,
                        players: []
                    }
                );
            })
            .catch(err => {
                fail(err);
            })
            .then(() => {
                done();
            });
        });
        it("returns 406 on bad local games", (done) => {
            postNewGame(badLocalGame1)
            .then((resObj: newGameResponse) => {
                expect(resObj.res.statusCode).toBe(406);
            })
            .then(() => postNewGame(badLocalGame2)
            .then((resObj: newGameResponse) => {
                expect(resObj.res.statusCode).toBe(406);
            }))
            .then(() => postNewGame(badLocalGame3)
            .then((resObj: newGameResponse) => {
                expect(resObj.res.statusCode).toBe(406);
            }))
            .catch((err) => {
                fail(err);
            })
            .then(() => {
                done();
            });
        });
        it("returns 406 on bad online games", (done) => {
            postNewGame(badOnlineGame1)
            .then((resObj: newGameResponse) => {
                expect(resObj.res.statusCode).toBe(406);
            })
            .then(() => postNewGame(badOnlineGame2))
            .then((resObj: newGameResponse) => {
                expect(resObj.res.statusCode).toBe(406);
            })
            .catch((err) => {
                fail(err);
            })
            .then(() => {
                done();
            });
        });
        it("returns message 'there cannot be less than 2 players' for to small local games", (done) => {
            postNewGame(badLocalGame1)
            .then((resObj: newGameResponse) => {
                expect(resObj.body.message).toBe("There cannot be less than 2 players in a game");
            })
            .then(() => postNewGame(badLocalGame2))
            .then((resObj: newGameResponse) => {
                expect(resObj.body.message).toBe("There cannot be less than 2 players in a game");
            })
            .catch((err) => {
                fail(err);
            })
            .then(() => {
                done();
            });
        });
        it("returns message 'there cannot be less than 2 players' for to small online games", (done) => {
            postNewGame(badOnlineGame1)
            .then((resObj: newGameResponse) => {
                expect(resObj.body.message).toBe("There cannot be less than 2 players in a game");
            })
            .catch((err) => {
                fail(err);
            })
            .then(() => {
                done();
            });
        });
        it("returns message 'there cannot be more than 6 players' for to large local games", (done) => {
            postNewGame(badLocalGame3)
            .then((resObj: newGameResponse) => {
                expect(resObj.body.message).toBe("There cannot be more then 6 players in a game");
            })
            .catch((err) => {
                fail(err);
            })
            .then(() => {
                done();
            });
        });
        it("returns message 'there cannot be more than 6 players' for to large online games", (done) => {
            postNewGame(badOnlineGame2)
            .then((resObj: newGameResponse) => {
                expect(resObj.body.message).toBe("There cannot be more then 6 players in a game");
            })
            .catch((err) => {
                fail(err);
            })
            .then(() => {
                done();
            });
        });
    });
});
