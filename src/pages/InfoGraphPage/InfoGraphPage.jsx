import React from 'react';
import {useParams} from "react-router-dom";
import cs from "./InfoGraphPage.module.css"
import light from "../../assets/images/infographics/light.png"
import thinking from "../../assets/images/infographics/thinking.png"
import hardSound from "../../assets/images/infographics/hard-sound.png"
const InfoGraphPage = () => {
    const {id} = useParams();
    let m = {
        1: light,
        4: hardSound,
        10: thinking,
        11: thinking,
    }
    return <div>
        <img src={m[id]} className={cs.graph}/>
    </div>
};

export default InfoGraphPage;