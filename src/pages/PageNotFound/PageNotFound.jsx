import React from 'react';
import cs from "./PageNotFound.module.css"
import {NavLink} from "react-router-dom";
import Button from "../../components/UI/Button/Button";
const PageNotFound = () => {
    return (
        <div className={cs.wrapper}>
            <h1>
                404
            </h1>
            <p>page not found</p>
            <Button>
                <NavLink to="/">
                    <p>Back to main page</p>
                </NavLink>
            </Button>
        </div>

    );
};

export default PageNotFound;