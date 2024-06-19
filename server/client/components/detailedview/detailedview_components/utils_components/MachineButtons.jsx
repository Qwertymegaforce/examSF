import React from 'react';
import { Link } from 'react-router-dom';
import { machine_buttons } from './utilscomponents_utils';

function Button(props){
    return (
        <Link to={`${props.link}${props.id}`}>
            <button className='basic_button'>
                {props.text}
            </button>
        </Link>
    )
}



const MachineButtons = (props) => {

    let buttons = machine_buttons.filter(item => item.role < props.role)
    
    buttons = buttons.map((item, index)=> {
        return <Button
            key={index}
            text={item.text}
            id={props.id}
            link={item.link}
        />
    })

    return (
        <div className='machine_buttons_component'>
            {buttons}
        </div>
    );
}

export default MachineButtons;
