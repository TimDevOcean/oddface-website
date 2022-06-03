import React from 'react';



const Menu = (props) => {

    return (
        <div className='menu'>
            <ul>
                <a href={props.mi1link}><li>{props.mi1}</li></a>
                <a href={props.mi2link}><li>{props.mi2}</li></a>
            </ul>
        </div>
    );
};


export default Menu;