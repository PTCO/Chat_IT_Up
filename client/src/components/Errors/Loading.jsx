import React, {useEffect} from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
const Loading = () => { 
    const navigate = useNavigate();
    useEffect(()=>{
        let x = 1;
        setTimeout(() => {
            if(x === 1) navigate('/Chat')
            else return
        }, 1000);
        return () => {
            x = 0;
        }
    }, [])
    return (
        <h1 className="colorFullBorders mt-4 w-75 rounded mx-auto">LOADING...</h1>
    )
}

export default Loading;