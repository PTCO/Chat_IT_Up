import { useContext } from "react";
import SessionContext from "../../../contex/sessionContext";
const Searched_User = ({Portrait, Username, User_ID, isPrivate, isRequested}) => {
    const { actions } = useContext(SessionContext);

    return (
        <div className="d-flex align-items-center border border-2 p-2 rounded colorFullBorders mt-3 w-100" >
            <img src={Portrait} alt="" className="userPortrait rounded-circle"/>
            <h2 className="mb-0 fs-4 ms-2">{ Username }</h2>
            { isRequested ? 
            <p className="bg-dark text-white p-1 border rounded  fs-5 ms-auto  me-1 mb-0">Requested</p>
            :
            <button className="btn btn-dark ms-auto  p-1 me-1" onClick={e => actions.createSession(Username, User_ID, Portrait, 'Added') }>{!isPrivate ? 'Add':'Request'}</button>
            }
        </div>
    )
}

export default Searched_User;