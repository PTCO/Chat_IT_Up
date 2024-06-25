import axios from "axios";
import SessionContext from "./sessionContext";

const { createContext, useContext } = require("react");

const RequestContext = createContext();


export const RequestProvider = (props) => {
    const { actions } = useContext(SessionContext);

    const updateRequests = async(data) => {
        if(data.Request === 'Accept') {
            await axios.put(`${process.env.REACT_APP_SERVER_URL}Requests/Update`, {data})
            await actions.createSession(data.Username, data.Requester_ID, data.Portrait, data.Request)
        }
        await axios.put(`${process.env.REACT_APP_SERVER_URL}Requests/Update`, {data})
    }

    return (
        <RequestContext.Provider value={{
            actions: {
                updateRequests,
            }
        }}>
            {props.children}
        </RequestContext.Provider>
    )
}

export default RequestContext;