import React from "react";

export function createSocketComm(inParentComponent: React.Component){

    //inicijalni kontakt sa serveromm
    const connection: WebSocket = new WebSocket("ws://localhost:5000");

    connection.onopen = () =>{
        console.log("Konekcija sa serverom otvorena");
    };

    connection.onerror = error => {
        console.log(`Websocket error: ${error}`)
    };

    connection.onmessage = function(inMessage: any){

        console.log(`WS received: ${inMessage.data}`);

        const msgParts: string[] = inMessage.data.split("_");
        const message: string = msgParts[0];

        switch(message){

            case "connected": //pid spojenoga
             this.state.handleMessage_connected(msgParts[1]);
            break;

            case "start":
                this.state.handleMessage_start(JSON.parse(msgParts[1]));
            break;

            case "update": //aazuriraj pid score
                this.state.handleMessage_update(msgParts[1], parseInt(msgParts[2]));
            break;

            case "gameOver": //vrati pid pobjednika
                this.state.handleMessage_gameOver(msgParts[1]);
            break;
            
        }
    }.bind(inParentComponent) 

    //posalji objekt serveru
    this.send = function(inMessage: string){

        console.log(`WS sending: ${inMessage}`);
        connection.send(inMessage);
    }


    return this;

}