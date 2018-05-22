# capston-project
A dice game ReST API that just saves the game for now. There are tests written to show how the calls work. The backend is written in typescript node.js and uses a mongo database.

### Running the app
To run the cd into the folder and run ```npm run serve```

In a new window run ```mongod```

### Running tests
In a new window run ```npm run test```

You can also write your own calls to see how the api works for yourself.

## How the app works
You can build a new game, with 2-6 players, and then add new players to a local game.
### building a new game
Make a POST XMLHttpRequest with the url ``http://localhost:3000/create_game``
The body of the request is a json object containing 

```{'name': String, 'type': GameType, playerCount: Number}```

Name is the name of the game.

Type is the type of game being played. (game type is an enum where 0=local, and 1=online. Online games are not set up yet)

playerCount is the number of players. (you can have between 2 and 6 players)

### add players to a local game
Make a POST XMLHttpRequest with the url ``http://localhost:3000/add_local_player``
The body of the request is a json object containing

```{'game': String, 'player': String, 'computer'?: Boolean}```

game is the name of the local game you want to add the player to.

player is the name of the player.

computer is an optional boolean to specify if a player is a computer, but computer players are not supported yet.
