import React from 'react';
import Navigation from '../Navgitation/Navigation'
import { Outlet} from 'react-router-dom';

function Chat() {
    return (
        <div className='d-flex flex-column align-items-center chat'>
            <div className='d-flex justify-content-center'>
                <Navigation 
                    Options={['fa-message', 'fa-square-plus', 'fa-cog']} // Place font awsome 2nd set of class values here for desired icons
                    URLs={['/Chat', '/Chat/Add', '/Chat/Settings']} // Set where each icon nav option navigates to
                    Size={""} // controls icon size possible values - ( "sm", "md", "lg", "xlg", "2x")
                    Orientation={"Horiz"} // options ("Horiz", "Vert")
                    Width={"20em"} // Sets width of Nav container
                />          
            </div>
            <Outlet />
        </div>
    );
}

export default Chat
