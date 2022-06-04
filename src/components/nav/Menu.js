import React from 'react';
import { Link } from 'react-router-dom';



const Menu = (props) => {

    return (
        <div className='menu'>
            <ul>
                <Link to={`${props.mi1link}`}><li>{props.mi1}</li></Link>
                <Link to={`${props.mi2link}`}><li>{props.mi2}</li></Link>
            </ul>
        </div>
    );
};


export default Menu;