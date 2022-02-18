import React, { Component } from "react";
import ControlArea from "./ControlArea";
import PlayerBoard from "./PlayerBoard";
import { createState } from "../state";

//parent komponenta cijele aplikacije
class BaseLayout extends Component{

    /*state data za apliakciju, ukljucuje mutator funkcije za manipuliranje statea, tako da se prosljeduje sve preko propsa
    iako ne podlijeze enkapsulaciji podataka*/

    state = createState(this);

    render(){

        return(

            <div className="appContainer">
                <div className="playerBoard"><PlayerBoard state={this.state}/></div>
                <div className="controlArea"><ControlArea state={this.state}/></div>
            </div>


        );
    }

}

export default BaseLayout;