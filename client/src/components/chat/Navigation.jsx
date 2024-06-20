import React from 'react';
import Option from './Option';

import './CSS/Navigation.css'

const Gallery_Nav = ({ Options , URLs , Size , Orientation, Width }) => {

    const handleNavigation = (path) => {
        window.location = path;
    }

    return (
        <nav className="p-2 p-md-3 border border-3 rounded NavOuterContainer mt-auto" style={{width: Width}}>
            <ul className={`d-flex ${Orientation === 'Vert' ? 'flex-column ' : ''} align-items-center justify-content-evenly NavInnerContianer`}>
                {
                    Options.map( (icon, index) => 
                        <Option key={icon} handleNavigation={handleNavigation} Icon={icon} Size={Size} Url={URLs[index]} Orientation={Orientation}/>
                    )
                }
            </ul>      
        </nav>
    );
}

export default Gallery_Nav;