import React from 'react';
import { Link } from 'react-router-dom';
import { infoParser } from './utils_components/utilscomponents_utils';
import AdditionalInfo from './utils_components/AdditionalInfo';

const ServiceView = (props) => {
    
    let [infobooks, users] = infoParser(props.data)

    return (
        <div className='service_view_component'>
            <div className="infobook_info_list">
                {infobooks}
            </div>
            <div className="user_info">
                <h1>Информация о пользователях</h1>
                <div className="user_list">    
                    {users}
                </div>
            </div>
            <AdditionalInfo data={props.data}/>
            {props.data?.machine?.id && <Link to={`/machine/${props.data.machine.id}`}>Посмотреть связанную технику</Link>}
        </div>
    );
}

export default ServiceView;
