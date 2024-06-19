import React from 'react';
import { params_to_mapper, infoMapper } from './utilscomponents_utils';
import { useParams } from 'react-router';

const AdditionalInfo = (props) => {

    let instance = useParams().instance
    let business_info

    if(props.data)
    {
        business_info = infoMapper(params_to_mapper[instance], props.data)
    }
    
    return (
        <>
            <h1>Подробная информация</h1>
            <div className='business_info'>
                {props.data && business_info}
            </div>
        </>
    );
}

export default AdditionalInfo;
