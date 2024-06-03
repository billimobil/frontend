import React from 'react';

import cs from "./Footer.module.css"
import arman from '../../../assets/images/avatars/arman.jpg'
import varvara from '../../../assets/images/avatars/varvara.jpg'
import alexander from '../../../assets/images/avatars/alexander.jpg'
import arseniy from '../../../assets/images/avatars/arseniy.jpg'
import artem from '../../../assets/images/avatars/artem.jpg'
import denis from '../../../assets/images/avatars/denis.jpg'
import olga from '../../../assets/images/avatars/olga.jpg'
import danya from '../../../assets/images/avatars/danya.jpg'
import egor from '../../../assets/images/avatars/egor.jpg'

const Footer = () => {
    return (
        <div className={cs.wrapper}>
            <p className={cs.text}>Сайт разработан:</p>
            <div className={cs.avatars}>
                <a href="https://t.me/vrvrlz"><img title="Варвара Лизунова" alt="Варвара Лизунова" className={cs.avatars__item + " " + cs.pink} src={varvara}/></a>
                <a href="https://t.me/oa0aooa"><img title="Ольга Скарга" alt="Ольга Скарга" className={cs.avatars__item + " " + cs.pink} src={olga}/></a>
                <a href="https://t.me/Voosilev"><img title="Александр Васильев"  alt="Александр Васильев"className={cs.avatars__item + " " + cs.blue} src={alexander}/></a>
                <a href="https://t.me/Temri1337"><img title="Артем Королёв" alt="Артем Королёв" className={cs.avatars__item + " " + cs.blue} src={artem}/></a>
                <a href="https://t.me/armanokka"><img title="Арман Торениязов" alt="Арман Торениязов" className={cs.avatars__item + " " + cs.blue} src={arman}/></a>
                <a href="https://t.me/tgdanandr53"><img title="Даниил Андреев" alt="Даниил Андреев" className={cs.avatars__item + " " + cs.blue} src={danya}/></a>
                <a href="https://t.me/Magatron72"><img title="Арсений Каров" alt="Арсений Каров" className={cs.avatars__item + " " + cs.blue} src={arseniy}/></a>
                <a href="https://t.me/Wargodder"><img title="Егор Доровский" alt="Егор Доровский" className={cs.avatars__item + " " + cs.blue} src={egor}/></a>
                <a href="https://t.me/denbuz52"><img title="Денис Бузин" alt="Денис Бузин" className={cs.avatars__item + " " + cs.blue} src={denis}/></a>
            </div>
            <p className={cs.text}>сделано с ♥ в ИТМО</p>
            <p className={cs.text}>2024</p>
        </div>
    );
};

export default Footer;