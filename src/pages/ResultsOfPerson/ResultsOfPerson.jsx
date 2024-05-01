import React, { useState } from "react";
import cs from "./ResultsOfPerson.module.css";
import axios from "axios";
import { useEffect } from "react";



function ResultsOfPersons({user}) {
    

    const [users, setUsers] = useState([])
    useEffect(()=>{
        axios.get("http://188.225.74.17:8080/api/v1/getAllUsers", {
            params: {
                session_token: user.session_token,
            }
        }).then(resp=>{
            setUsers(resp.data.data)
            console.log(resp.data.data)
        }).catch(e=>{
        })
     }, [])

        return (
            <div className={cs.wrapper}>
                <div className={cs.resultsPerson_block}>
                    {users.map(elem => (
                        <div className="ContentItem">
                            <div>{user.first_name}</div>
                            <div>{user.second_name}</div>
                            <div>{user.email}</div>
                            <div>{user.group}</div>
                            <div>{user.isu}</div>
                            <div className="ResultsOfItemBtn">
                                <button>Результаты тестов</button>
                            </div>
                        </div>
                        ))}
                </div>            
            </div>

        )
    // }


    
}



export default ResultsOfPersons;