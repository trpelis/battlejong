import path from "path";
import express, { Express } from "express";
import WebSocket from "ws";

//svaki element je objekt s propsima pid, score, stillPlaying
const players: any = {};

//express za client side
const app: Express = express();
app.use("/", express.static(path.join(__dirname, "../../client/dist")));
app.listen(80, () => {
    console.log("BattleJong Express server spreman.");
})

//konstrukcija websocket servera
const wsServer = new WebSocket.Server({ port: 5000 }, function() {
    console.log("BattleJong WebSocket server spreman.");
});
wsServer.on("connection", (socket: WebSocket) =>{
    console.log("Igrac spojen");

    //message handler
    socket.on("message", (inMsg: string) =>{
        console.log(`Message: ${inMsg}`);

        const msgParts: string[] = inMsg.toString().split("_");
        const message: string = msgParts[0];
        const pid: string = msgParts[1];

        switch (message){

            //kad se spoje tileovi, prikazi match_pid_points
            case "match":
                players[pid].score += parseInt(msgParts[2]);
                //update score plocu oba igraca
                wsServer.clients.forEach(function each(inClient: WebSocket){
                    inClient.send(`update_${pid}_${players[pid].score}`);
                });
                break;

                //kada igrac nema poteza ili ocisti
                case "done":
                    players[pid].stillPlaying = false;
                    //provjeri jesu li oba igraca zavrsila s igranjem
                    let playersDone: number = 0;
                    for (const player in players){
                        if (player.hasOwnProperty(player)){
                            if(!players[player].stillPlaying){
                                playersDone++;
                            }
                        }
                    }

                    //kada oba zavrse s igranjem, provjeri pobjednika
                    if(playersDone == 2){
                        let winningPID: string;
                        const pids: string[] = Object.keys(players);
                        if (players[pids[0]].score > players[pids[1]].score){
                            winningPID = pids[0];
                        }else{
                            winningPID = pids[1];
                        }

                        //posalji ishod obojici igraca
                        wsServer.clients.forEach(function each(inClient: WebSocket){
                            inClient.send(`gameOver_${winningPID}`);
                        });
                    }
                    break;

        }
    });

    //napravi pid za igraca i dodaj ga u kolekciju
    const pid: string = `pid${new Date().getTime()}`;
    players[pid] = { score : 0, stillPlaying: true};

    //obavijesti igraca da je spojen i opredijeli mu njegov ID
    socket.send(`connected_${pid}`);

    //ukoliko su dva igraca, prebaci state na client
    if (Object.keys(players).length === 2){
        //shuffleaj tileove da se layout moze poslati igracima
        const shuffledLayout: number [][][] = shuffle();
        wsServer.clients.forEach(function each(inClient: WebSocket){
            inClient.send(`start_${JSON.stringify(shuffledLayout)}`);
        });
    }

});
//--------------------------------------------GAME CODE--------------------------------------

//0 - nema plocice (tile), 1 - plocica
//velicina layera 15x9 (135 po layeru, 675 ukupno), plocice su 36x44
//kad se ploca shufflea, sve jedinice postaju 101-142 (tile type filename)
//Plocica 101 je wildcard

const layout: number[][][] = [

/* Layer 1. */
[
    [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
    [ 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0 ],
    [ 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0 ],
    [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
    [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
    [ 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0 ],
    [ 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0 ],
    [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
  ],
  /* Layer 2. */
  [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
  ],
  /* Layer 3. */
  [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
  ],
  /* Layer 4. */
  [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
  ],
  /* Layer 5. */
  [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
  ]
];

/**shuffle plocice u layoutu, ovdje se koristi americki pristup, 
 * sto znaci da postoje kombinacije u kojima shuffle moze biti 
 * nerjesiv, tj ne moze se ploca ocistiti
 * /
 @return A shuffled layout
 */


function shuffle(): number[][][] {

    //kloniraj layout
    const clone: number[][][] = layout.slice(0);

    //najvise 4 wildcarda mogu ici, counter 
    let numWildCards: number = 0;

    //iteriraj po cijeloj ploci, random biraj tileove za svaku poziciju
    const numTileTypes: number = 42;
    for (let l: number = 0; 1 < clone.length; l++){
        const layer: number[][] = clone[l];
        for (let r: number = 0; r < layer.length; r++){
            const row: number[] = layer[r];
            for (let c: number = 0; c < row.length; c++){
                const tileVal: number = row[c]
                //tileVal > 0 znaci da postoji tile na toj poziciji
                if (tileVal === 1){
                    row[c] = (Math.floor(Math.random() * numTileTypes)) + 101;

                    if (row[c] === 101 && numWildCards === 3){
                        row[c] = 102;
                    }else{
                        numWildCards += numWildCards;
                    }
                }
            }

        }
    }
    return clone;
}




