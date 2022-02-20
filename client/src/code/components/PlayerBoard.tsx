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
                    const style: CSSProperties = {
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
                    switch (tileVal) {
                        case 101 : tiles.push(<img style={style} src={tile101} className={className} onClick={()=>state.tileClick(l, r, c)} alt="" />); break;
                        case 102 : tiles.push(<img style={style} src={tile102} className={className} onClick={()=>state.tileClick(l, r, c)} alt="" />); break;
                        case 103 : tiles.push(<img style={style} src={tile103} className={className} onClick={()=>state.tileClick(l, r, c)} alt="" />); break;
                        case 104 : tiles.push(<img style={style} src={tile104} className={className} onClick={()=>state.tileClick(l, r, c)} alt="" />); break;
                        case 105 : tiles.push(<img style={style} src={tile105} className={className} onClick={()=>state.tileClick(l, r, c)} alt="" />); break;
                        case 106 : tiles.push(<img style={style} src={tile106} className={className} onClick={()=>state.tileClick(l, r, c)} alt="" />); break;
                        case 107 : tiles.push(<img style={style} src={tile107} className={className} onClick={()=>state.tileClick(l, r, c)} alt="" />); break;
                        case 108 : tiles.push(<img style={style} src={tile108} className={className} onClick={()=>state.tileClick(l, r, c)} alt="" />); break;
                        case 109 : tiles.push(<img style={style} src={tile109} className={className} onClick={()=>state.tileClick(l, r, c)} alt="" />); break;
                        case 110 : tiles.push(<img style={style} src={tile110} className={className} onClick={()=>state.tileClick(l, r, c)} alt="" />); break;
                        case 111 : tiles.push(<img style={style} src={tile111} className={className} onClick={()=>state.tileClick(l, r, c)} alt="" />); break;
                        case 112 : tiles.push(<img style={style} src={tile112} className={className} onClick={()=>state.tileClick(l, r, c)} alt="" />); break;
                        case 113 : tiles.push(<img style={style} src={tile113} className={className} onClick={()=>state.tileClick(l, r, c)} alt="" />); break;
                        case 114 : tiles.push(<img style={style} src={tile114} className={className} onClick={()=>state.tileClick(l, r, c)} alt="" />); break;
                        case 115 : tiles.push(<img style={style} src={tile115} className={className} onClick={()=>state.tileClick(l, r, c)} alt="" />); break;
                        case 116 : tiles.push(<img style={style} src={tile116} className={className} onClick={()=>state.tileClick(l, r, c)} alt="" />); break;
                        case 117 : tiles.push(<img style={style} src={tile117} className={className} onClick={()=>state.tileClick(l, r, c)} alt="" />); break;
                        case 118 : tiles.push(<img style={style} src={tile118} className={className} onClick={()=>state.tileClick(l, r, c)} alt="" />); break;
                        case 119 : tiles.push(<img style={style} src={tile119} className={className} onClick={()=>state.tileClick(l, r, c)} alt="" />); break;
                        case 120 : tiles.push(<img style={style} src={tile120} className={className} onClick={()=>state.tileClick(l, r, c)} alt="" />); break;
                        case 121 : tiles.push(<img style={style} src={tile121} className={className} onClick={()=>state.tileClick(l, r, c)} alt="" />); break;
                        case 122 : tiles.push(<img style={style} src={tile122} className={className} onClick={()=>state.tileClick(l, r, c)} alt="" />); break;
                        case 123 : tiles.push(<img style={style} src={tile123} className={className} onClick={()=>state.tileClick(l, r, c)} alt="" />); break;
                        case 124 : tiles.push(<img style={style} src={tile124} className={className} onClick={()=>state.tileClick(l, r, c)} alt="" />); break;
                        case 125 : tiles.push(<img style={style} src={tile125} className={className} onClick={()=>state.tileClick(l, r, c)} alt="" />); break;
                        case 126 : tiles.push(<img style={style} src={tile126} className={className} onClick={()=>state.tileClick(l, r, c)} alt="" />); break;
                        case 127 : tiles.push(<img style={style} src={tile127} className={className} onClick={()=>state.tileClick(l, r, c)} alt="" />); break;
                        case 128 : tiles.push(<img style={style} src={tile128} className={className} onClick={()=>state.tileClick(l, r, c)} alt="" />); break;
                        case 129 : tiles.push(<img style={style} src={tile129} className={className} onClick={()=>state.tileClick(l, r, c)} alt="" />); break;
                        case 130 : tiles.push(<img style={style} src={tile130} className={className} onClick={()=>state.tileClick(l, r, c)} alt="" />); break;
                        case 131 : tiles.push(<img style={style} src={tile131} className={className} onClick={()=>state.tileClick(l, r, c)} alt="" />); break;
                        case 132 : tiles.push(<img style={style} src={tile132} className={className} onClick={()=>state.tileClick(l, r, c)} alt="" />); break;
                        case 133 : tiles.push(<img style={style} src={tile133} className={className} onClick={()=>state.tileClick(l, r, c)} alt="" />); break;
                        case 134 : tiles.push(<img style={style} src={tile134} className={className} onClick={()=>state.tileClick(l, r, c)} alt="" />); break;
                        case 135 : tiles.push(<img style={style} src={tile135} className={className} onClick={()=>state.tileClick(l, r, c)} alt="" />); break;
                        case 136 : tiles.push(<img style={style} src={tile136} className={className} onClick={()=>state.tileClick(l, r, c)} alt="" />); break;
                        case 137 : tiles.push(<img style={style} src={tile137} className={className} onClick={()=>state.tileClick(l, r, c)} alt="" />); break;
                        case 138 : tiles.push(<img style={style} src={tile138} className={className} onClick={()=>state.tileClick(l, r, c)} alt="" />); break;
                        case 139 : tiles.push(<img style={style} src={tile139} className={className} onClick={()=>state.tileClick(l, r, c)} alt="" />); break;
                        case 140 : tiles.push(<img style={style} src={tile140} className={className} onClick={()=>state.tileClick(l, r, c)} alt="" />); break;
                        case 141 : tiles.push(<img style={style} src={tile141} className={className} onClick={()=>state.tileClick(l, r, c)} alt="" />); break;
                        case 142 : tiles.push(<img style={style} src={tile142} className={className} onClick={()=>state.tileClick(l, r, c)} alt="" />); break;
                      }
                }
            }
        }
    }

    return (<React.Fragment>{tiles}</React.Fragment>);

};

export default PlayerBoard;