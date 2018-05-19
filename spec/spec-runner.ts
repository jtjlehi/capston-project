import { AddGameTestSuit } from "./add-game";
import { connect, connection, disconnect } from "mongoose";

(async () => {
    try {
        await connect('mongodb://localhost/game');
        await connection.dropDatabase();
        await disconnect();
    } catch(error) {
        console.log(error.message);
    }
})()

AddGameTestSuit.run();
