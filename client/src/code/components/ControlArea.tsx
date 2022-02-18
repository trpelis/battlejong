import React from "react";

const ControlArea = ({state} : any) => (

    <React.Fragment>
        <div style = {{float:"left", width:"130px"}}>Vas rezultat:</div><div>{state.scores.player}</div>
        <div style = {{float:"left", width:"130px"}}>Rezultat protivnika:</div><div>{state.scores.opponent}</div>
        <br/>
        <hr style = {{width:"75%", textAlign:"center"}} />
        <br/>
        { state.gameState === "awaitingOpponent" &&
        <div style = {{ color: "#ff0000", fontWeight:"bold", textAlign:"center"}}>Cekanje protivnika</div>}
        { state.gameState ==="deadEnd" &&
        <div style = {{ color:"#ff0000", fontWeight:"bold", textAlign:"center"}}>Preostali potezi 0. <br/><br/> Pricekajte da protivnik dovrsi</div> }
        { state.gameState === "cleared" &&
        <div style={{ color:"#ff0000", fontWeight:"bold", textAlign:"center"}}>
            Cestitamo, ocistili ste plocu!<br/><br/>Pricekajte da protivnik zavrsi potez.</div>}
        { state.gameState === "gameOver" &&
        <div style = {{ color:"#ff0000", fontWeight:"bold", textAlign:"center"}}> Igra je zavrsila.<br/><br/>
        {state.gameOutcome}</div>}

    </React.Fragment>

);

export default ControlArea;