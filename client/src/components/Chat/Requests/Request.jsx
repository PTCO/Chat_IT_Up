import { useContext } from "react";
import RequestContext from "../../../contex/requestContext";
import ThemeContext from "../../../contex/themeContext";

const Request = ({refresh, Username, Portrait, Requester_ID, Request_ID, Type}) => {
    const { actions } = useContext(RequestContext);
    const { darkMode } = useContext(ThemeContext);
    return(
        <div className={`${darkMode ? 'text-white bg-dark':null} d-flex align-items-center colorFullBorders border p-2 rounded mt-2`}>
            <img src={Portrait} alt="" className="requestPortrait rounded-circle me-2"/>
            <h2 className="fs-5 m-0">{Username}</h2>
            { Type === 'Sent' ? 
            <span className="d-flex align-items-center  ms-auto requestOptions">
                <p className="m-0 bg-dark text-white border rounded p-1">Pending</p>
                <button className="btn btn-danger p-1 ms-1" onClick={ e => {actions.updateRequests({Request: 'Delete', Requester_ID}); refresh()}}>Cancel</button>
            </span>
            :
            <span className="d-flex align-items-center ms-auto requestOptions">
                <button className="btn btn-success p-1 ms-1" onClick={ e => actions.updateRequests({Request: 'Accept', Requester_ID, Username, Portrait})}>Accept</button>
                <button className="btn bg-dark text-white border-dark p-1 ms-1" onClick={ e => {actions.updateRequests({Request: 'Delete', Requester_ID}); refresh()}}>Decline</button>
            </span>
            }
            
        </div>
    )
}

export default Request;