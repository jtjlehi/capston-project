import { color, colorLog } from './color';
import TestSuit from './test-suit_class';
import { CreateGameObj } from '../start/typings/create_game_obj-interface';
import { GameType } from '../start/typings/game_type-enum';
import { NewGameResponse } from './new-game-response_interface';

export class AddGameTestSuit extends TestSuit {
    url: string = "http://localhost:3000/create_game";
    method: string =  'POST';
    tests: Array<[CreateGameObj | object, NewGameResponse, string]> = [
        [
            {
                name: 'good local game',
                type: GameType.Local,
                playerCount: 3
            },
            {
                status: 201,
                body: {
                    name: 'good local game',
                    type: GameType.Local,
                    players: []
                }
            }, 'Good local Game'
        ],
        [
            {
                name: 'second good local game',
                type: GameType.Local,
                playerCount: 2
            },
            {
                status: 201,
                body: {
                    name: 'second good local game',
                    type: GameType.Local,
                    players: []
                }
            }, "Good Local Game 2"
        ],
        [
            {
                name: 'game with to few players',
                type: GameType.Local,
                playerCount: 1
            },
            {
                status: 406,
                body: {
                    errorCode: 406,
                    message: 'cannot have less then 2 players'
                }
            }, "Local game with to few players"
        ],
        [
            {
                name: 'My second game with to few players',
                type: GameType.Local,
                playerCount: 0
            },
            {
                status: 406,
                body: {
                    errorCode: 406,
                    message: 'cannot have less then 2 players'
                }
            }, "Local game with to few players 2"
        ],
        [
            {
                name: 'local game with to many players',
                type: GameType.Local,
                playerCount: 7
            },
            {
                status: 406,
                body: {
                    errorCode: 406,
                    message: 'cannot have more then 6 players'
                }
            }, "Local game with to many players"
        ],
        [
            {
                name: 'My good online game',
                type: GameType.Online,
                playerCount: 4
            },
            {
                status: 201,
                body: {
                    name: 'My good online game',
                    type: GameType.Online,
                    players: []
                }
            }, "Good online game"
        ],
        [
            {
                name: 'My online game with to few players',
                type: GameType.Online,
                playerCount: 1
            },
            {
                status: 406,
                body: {
                    errorCode: 406,
                    message: 'cannot have less then 2 players'
                }
            }, "online game with to few players"
        ],
        [
            {
                name: 'My online game with to many players',
                type: GameType.Online,
                playerCount: 7
            },
            {
                status: 406,
                body: {
                    errorCode: 406,
                    message: 'cannot have more then 6 players'
                }
            }, 'Online game with to many players'
        ],
        [
            {
                name: 'My game with only a name'
            },
            {
                status: 400,
                body: {
                    errorCode: 400,
                    message: 'Request body must contain name, playerCount, and body'
                }
            }, 'Game that has only a name'
        ],
        [
            {
                playerCount: 0
            },
            {
                status: 400,
                body: {
                    errorCode: 400,
                    message: 'Request body must contain name, playerCount, and body'
                }
            }, 'Game that has only a playerCount that wouldn\'t pass the count test'
        ],
        [
            {
                type: 0
            },
            {
                status: 400,
                body: {
                    errorCode: 400,
                    message: 'Request body must contain name, playerCount, and body'
                }
            }, 'Game that has only a type that would pass the type test'
        ],
        [
            {
                name: 'Game with bad type',
                type: 4,
                playerCount: 5
            },
            {
                status: 406,
                body: {
                    errorCode: 406,
                    message: "property 'type' must be either 0 or 1"
                }
            }, 'Game that has the wrong type'
        ]
    ];
    public runTests() {
        colorLog(color.BgCyan, 'Starting the AddGame test suit');
        this.tests.forEach((test, count) => {
            this.addCall(test[0], test[1], 'Test: ' + test[2]);
        });
    }
}
const suit = new AddGameTestSuit();
suit.runTests();