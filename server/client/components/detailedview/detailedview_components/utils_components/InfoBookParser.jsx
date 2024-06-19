import React from 'react';
import { type_decoder } from '../../../controlpanel/controlpanel_components/masterpanel_components/masterpanel_utils';


const InfoBookParser = (props) => {
    return (
        <div className='infobook_parser_component'>
            <h2>{type_decoder[props.data.type]}: {props.data.title}</h2>
            <p>{props.data.text}</p>
            {props.un && <b>Уникальный заводской номер: {props.un}</b>}
        </div>
    );
}

export default InfoBookParser;
