import React, { useContext, useEffect, useState } from "react";
import userContext from '../../../contex/userContext';
import UserContext from "../../../contex/userContext";

const Account = () => {
    const { actions , errors} = useContext(UserContext);

    const [consent, setConsent ] = useState(false);
    const [consentMsg, setConsentMsg ] = useState("");

    useEffect(()=>{
        actions.setErrors([]);
    }, [])

    return(
        <>
            <div className={`btn ${!consent ? 'd-flex':'d-none'} align-items-center colorFullBorders p-2 rounded mt-2 w-100`} onClick={ e => setConsent(pre => !pre)}>
                <button className="btn rounded py-2 px-3 text-white me-2"><i class="fa-solid fa-user-minus"></i></button>
                <h3 className="m-0">Delete Account</h3>
            </div>
            <div className={`${!consent ? 'd-none':null} w-100 text-start fs-6 deleteConsentForm`}>
                <h2 className="border-bottom border-2 pb-1 mb-1 text-center">Delete Consent</h2>
                <p className="mb-1">Are you sure you would like to <b>delete</b> your account?</p>
                <h4 className="colorFullBorders p-1 rounded text-center mb-0 fs-5">Delete your <b>"Account"</b> results in lost of all:</h4>
                <ul className="fs-6">
                    <li className="d-flex align-items-center text-danger "><b className="fs-2 me-1 text-black">-</b> User chats <i class="ms-2 fs-1 fa-solid fa-users"></i></li>
                    <li className="d-flex align-items-center text-danger "><b className="fs-2 me-1 text-black">-</b> Messages or texts <i class="ms-2 fs-1 fa-solid fa-comment"></i></li>
                    <li className="d-flex align-items-center text-danger "><b className="fs-2 me-1 text-black">-</b> Customize settings <i class="ms-2 fs-1 fa-solid fa-brush"></i></li>
                    <li className="d-flex align-items-center text-danger"><b className="fs-2 me-1 text-black">-</b> Account settings <i class="ms-2 fs-1 fa-solid fa-gears"></i></li>
                </ul>
                <div className="d-flex flex-column text-center w-70 mx-auto mt-1 colorFullBorders rounded p-4">
                    <p className="mb-1">Type or Enter <b className="text-danger">"Yes, I would like to delete my ChatITUp Account"</b> in form field below.</p>
                    <input type="text" value={consentMsg} id="" className={`${errors.length > 0 ? 'border-danger':null} form-control mb-1`} onChange={ e => setConsentMsg(e.target.value)}/>
                    <span className="text-start mt-2">
                        <button className="btn text-white me-2" onClick={ e => actions.deleteUser(consentMsg)}>Delete</button>
                        <button className="btn bg-dark  border-dark text-white " onClick={ e => setConsent(false)}>Cancel</button>
                        <p className={`${errors.length > 0 ? 'd-flex':'d-none'} align-items-center justify-content-center m-0 mt-2`}>
                            {errors.map( error => error)} <i class="fa-solid fa-circle-exclamation text-danger ms-2"></i>
                        </p>
                    </span>
                </div>
            </div>
        </>
    );
}

export default Account;