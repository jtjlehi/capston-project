import { AddGameTestSuit } from "./add-game";
import { connect, connection, disconnect } from "mongoose";
import { AddLocalPlayer } from "./add-local-player";

(async () => {
    try {
        await connect('mongodb://localhost/game');
        await connection.dropDatabase();
        await AddGameTestSuit.run();
        await AddLocalPlayer.run();
        await disconnect();
    } catch(error) {
        console.log(error.message);
    }
})()

