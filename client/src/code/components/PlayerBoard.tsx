import React, { CSSProperties, ReactElement } from "react";

import tile101 from "../../assets/tile101.png";
import tile102 from "../../assets/tile102.png";
import tile103 from "../../assets/tile103.png";
import tile104 from "../../assets/tile104.png";
import tile105 from "../../assets/tile105.png";
import tile106 from "../../assets/tile106.png";
import tile107 from "../../assets/tile107.png";
import tile108 from "../../assets/tile108.png";
import tile109 from "../../assets/tile109.png";
import tile110 from "../../assets/tile110.png";
import tile111 from "../../assets/tile111.png";
import tile112 from "../../assets/tile112.png";
import tile113 from "../../assets/tile113.png";
import tile114 from "../../assets/tile114.png";
import tile115 from "../../assets/tile115.png";
import tile116 from "../../assets/tile116.png";
import tile117 from "../../assets/tile117.png";
import tile118 from "../../assets/tile118.png";
import tile119 from "../../assets/tile119.png";
import tile120 from "../../assets/tile120.png";
import tile121 from "../../assets/tile121.png";
import tile122 from "../../assets/tile122.png";
import tile123 from "../../assets/tile123.png";
import tile124 from "../../assets/tile124.png";
import tile125 from "../../assets/tile125.png";
import tile126 from "../../assets/tile126.png";
import tile127 from "../../assets/tile127.png";
import tile128 from "../../assets/tile128.png";
import tile129 from "../../assets/tile129.png";
import tile130 from "../../assets/tile130.png";
import tile131 from "../../assets/tile131.png";
import tile132 from "../../assets/tile132.png";
import tile133 from "../../assets/tile133.png";
import tile134 from "../../assets/tile134.png";
import tile135 from "../../assets/tile135.png";
import tile136 from "../../assets/tile136.png";
import tile137 from "../../assets/tile137.png";
import tile138 from "../../assets/tile138.png";
import tile139 from "../../assets/tile139.png";
import tile140 from "../../assets/tile140.png";
import tile141 from "../../assets/tile141.png";
import tile142 from "../../assets/tile142.png";

const PlayerBoard = ({ state}: any) => {
    const tileWidth: number = 72;
    const tileHeight: number = 88;
    const tileShadowWidth: number = 11;
    const tileShadowHeight: number = 1;

    //shiftanje ploce da ne bude na linijama containera
    const xAdjust: number = 10;
    const yAdjust: number = 36;

    //niz plocica komponenti koje ce React renderati
    const tiles: ReactElement[] = [ ];

    //3d efekt za plocice u svakom layeru
    let xOffset: number = 0;
    let yOffset: number = 0;

    //iteracija kroz sve layere u layoutu
    for (let l: number = 0; l < state.layout.length; l++){
        xOffset = xOffset + tileShadowWidth;
        yOffset = yOffset - tileShadowHeight;
        const layer: number[][] = state.layout[l];

        //Iteriraj kroz sve redove u layoutu
        for(let r: number = 0; r < layer.length; r++){
            const row: number[] = layer[r];
            //kroz stupce
            for(let c: number = row.length; c >= 0; c--){
                let tileVal: number = row[c];

                if(tileVal > 0){
                    //izracunaj poziciju baziranu na virtualnom 15x9 gridu, uzimajuci u obzire offsetove 
                    //za preklapanje sjena i promjene da se makne grid s rubova containera

                    const xLoc: number = (( c * tileWidth) - (c * tileShadowWidth)) + xOffset + xAdjust;
                    const yLoc: number = ((r * tileHeight) - (r * tileShadowHeight)) + yOffset + yAdjust; 

                    //plocica stil
                    const syle: CSSProperties = {
                        position : "absolute",
                        left : `${xLoc}px`,
                        top : `${yLoc}px`
                    };

                    //plocica highlight ako je odabrana
                    let className: string = "";
                    if(tileVal > 1000){
                        className = "highlightTile";
                        tileVal = tileVal - 1000;
                    }

                    //renderaj prikladni img tag
                }
            }
        }
    }

}