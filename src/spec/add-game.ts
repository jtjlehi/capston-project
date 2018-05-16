import { color, colorLog } from './color';
import TestSuit from './test-suit_class';
import { CreateGameObj } from '../start/typings/create_game_obj-interface';
import { GameType } from '../start/typings/game_type-enum';
import { NewGameResponse } from './new-game-response_interface';

export class AddGameTestSuit extends TestSuit {
    url: string = "http://localhost:3000/create_game";
    method: string =  'POST';
    tests: Array<[CreateGameObj, NewGameResponse]> = [
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
            }
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
            }
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
                    name: 'game with to few players',
                    type: GameType.Local,
                    players: []
                }
            }
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
                    name: 'My second game with to few players',
                    type: GameType.Local,
                    players: []
                }
            }
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
                    name: 'local game with to many players',
                    type: GameType.Local,
                    players: []
                }
            }
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
            }
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
                    name: 'My online game with to few players',
                    type: GameType.Online,
                    players: []
                }
            }
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
                    name: 'My online game with to many players',
                    type: GameType.Online,
                    players: []
                }
            }
        ]
    ];
    public runTests() {
        colorLog(color.BgCyan, 'Starting the AddGame test suit');
        this.tests.forEach((test, count) => {
            this.addCall(test[0], test[1], 'Test ' + count);
        });
    }
}
const suit = new AddGameTestSuit();
suit.runTests();