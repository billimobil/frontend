import React from 'react';
import {useNavigate} from "react-router-dom";

const Exit = ({setUser}) => {
    setUser(null)
    const navigate = useNavigate();
    navigate("/");
};

export default Exit;