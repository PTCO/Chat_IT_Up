import React, { useEffect, useState, useRef, useContext, act } from "react";
import SessionContext from "../../contex/sessionContext";
import Searched_User from "./Searched_User";

const Search_Form = () => {
    const { actions , results , resultMsg } = useContext(SessionContext)
    const search = useRef("")

    useEffect(()=>{
        actions.setResults([]);
        actions.setResultMsg(null);
    }, [])

    return (
        <div className="d-flex justify-content-center flex-column w-100 px-4 mt-3">
            <form action="" className='d-flex align-items-center w-100' onSubmit={ e => actions.searchSession(e, search.current.value)} >
                <input type="text" className='form-control fs-6 SearchField' ref={search}/><button type="submit" className='btn btn-dark ms-2 fs-6'>SEARCH</button>
            </form>
            <div className="d-flex flex-column py-2 border-top border-3 overflow-auto mt-4 h-100  SeachResults">
                <h3 className={`${resultMsg ? 'd-flex':'d-none'} fs-2 mx-auto mt-4 bg-dark p-2 text-white rounded`}>{resultMsg}</h3>
                { 
                    results.map( data => (
                        // Iterable code goes here
                        <Searched_User key={data.User_ID} Portrait={data.Portrait} isRequested={data.isRequested} Username={data.Username} User_ID={data.User_ID} isPrivate={data.isPrivate} />
                    ))
                }
                
            </div>
        </div>
    )
}

export default Search_Form; // You can place Search_From component inside a container div or element, then resize container to change size of Search_Form