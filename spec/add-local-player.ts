import TestSuit from "./test-suit_class";
import { colorLog, color } from "./color";
import { GamePlayer, PlayerType } from "../src/typings/player-types";
import { LocalPlayerResponse, ErrorMessage } from "../src/typings/response-types";
import { AddLocalPlayerRequest } from "../src/typings/requests-types";

export class AddLocalPlayer extends TestSuit {
    protected static _url: string = "/add_local_player";
    protected static _method: string =  "POST";
    protected static _name = 'AddLocalPlayer';
    private static _tests: Array<[
        AddLocalPlayerRequest | object,
        LocalPlayerResponse,
        string
    ]> = [
        [
            {
                game: 'good local game',
                player: 'Player 1'
            },
            {
                status: 201,
                body: {
                    game: 'good local game',
                    player: {
                        name: 'Player 1',
                        type: PlayerType.Local,
                        score: 0,
                        currentTurn: false
                    }
                }
            }, 'add a player correctly'
        ],
        [
            {
                game: 'good local game',
                player: 'Player 1'
            },
            {
                status: 406,
                body: {
                    errorCode: 406,
                    message: 'You cannot add two players with the same name'
                }
            }, "don't allow two players with the same name"
        ],
        [
            {
                game: 'weird named game',
                player: 'Player 2'
            },
            {
                status: 406,
                body: {
                    errorCode: 406,
                    message: 'there is no game with that name'
                }
            }, "don't add a player to a game that doesn't exist"
        ],
        [
            {
                game: 'good local game',
                player: 'Player 2'
            },
            {
                status: 201,
                body: {
                    game: 'good local game',
                    player: {
                        name: 'Player 2',
                        type: PlayerType.Local,
                        score: 0,
                        currentTurn: false
                    }
                }
            }, 'add a second player correctly'
        ],
        [
            {
                game: 'good local game',
                player: "Player 3"
            },
            {
                status: 201,
                body: {
                    game: 'good local game',
                    player: {
                        name: 'Player 3',
                        type: PlayerType.Local,
                        score: 0,
                        currentTurn: false
                    }
                }
            }, 'add a third player correctly'
        ],
        [
            {
                game: 'good local game',
                player: 'Player 4'
            },
            {
                status: 406,
                body: {
                    errorCode: 406,
                    message: 'You cannot add more players then the player count'
                }
            }, "don't allow a fourth player to be added"
        ],
        [
            {
                game: 'second good local game',
                player: 'computer',
                computer: true
            },
            {
                status: 406,
                body: {
                    errorCode: 406,
                    message: 'computer player mode has not been made yet'
                }
            }, "don't allow computer player"
        ],
        [
            {
                game: 'second good local game',
            },
            {
                status: 406,
                body: {
                    errorCode: 406,
                    message: 'you must specify a player and game'
                }
            }, "don't allow unspecified an player parameter"
        ],
        [
            {
                name: 'player 0',
            },
            {
                status: 406,
                body: {
                    errorCode: 406,
                    message: 'you must specify a player and game'
                }
            }, "don't allow unspecified an game parameter"
        ],
    ]
    private static async  runTests(testNum: number, first?: boolean): Promise<void> {
        if (first) colorLog(color.BgCyan, `Starting the ${this._name} test suit`);
        const test = this._tests[testNum];
        let testPassed = await this._addCall(test[0], test[1], 'Test: ' + test[2]);
        this.passArray.push(testPassed);
            if (this._tests.length > testNum + 1) this.runTests(testNum + 1);
            else this._logResults();
        return;
    }
    public static async run() {
        await this.runTests(0, true);
    }
}