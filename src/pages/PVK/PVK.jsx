import React, { useEffect, useState } from 'react';
import cs from './PVK.module.css';
import Button from '../../components/UI/Button/Button';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Pvk = ({user}) => {
    const { id } = useParams();
    // const [profession, setProfession] = useState(null);
    const [pvk, setPVK] = useState([]);
    const [error, setError] = useState('');
    const [clicked, setClicked] = useState([]);

    useEffect(() => {
        // console.log(id);
        // axios.get(`http://188.225.74.17:8080/api/v1/getProfession`, {
        //         params: {
        //             id: id,
        //             session_token: user.session_token,
        //         },
        //     })
        //     .then((resp) => {
        //         setProfession(resp.data.data);
        //     })
        //     .catch((e) => {
        //         setError(e.response.data.error);
        //     });

        axios
            .get('http://188.225.74.17:8080/api/v1/getPVKList')
            .then((response) => {
                setPVK(response.data.data);
            })
            .catch((err) => {
                setError(err);
            });
    }, [id]);

    function clickPvk(event, key) {
        console.log(event.target.style.background, key);
        if (event.target.style.background !== '') {
            // colored
            setClicked(clicked.filter((v) => v !== key));
            event.target.style.background = '';
            return;
        }
        if (clicked.length === 10) {
            return;
        }
        setClicked([...clicked, key]);

        const updatedPVK = pvk.map((elem) =>
            elem.id === key ? { ...elem, order: 0 } : { ...elem, order: elem.order + 1 }
        );
        updatedPVK.sort((a, b) => a.order - b.order);
        setPVK(updatedPVK);

        event.target.style.background = 'red';
    }

    return (
        <div className={cs.wrapper}>
            {error ? (
                <div className="error">{error}</div>
            ) : (
                <>
                    <div className={cs.head}>
                        {/*<h2>{profession ? profession.name : 'Загружаем данные....'}</h2>*/}
                        <p>Распределите ПВК по степени значимости по вашему мнению</p>
                    </div>

                    {pvk.map((elem) => (
                        <div key={elem.id} className={cs.pvk}>
                            <a onClick={(e) => clickPvk(e, elem.id)}>
                                    <p className={`${cs.pvk__name} ${cs.border}`}>{elem.name}</p>
                            </a>
                        </div>
                    ))}
                    <Button>Сохранить результат</Button>
                </>
            )}
        </div>
    );
};

export default Pvk;
