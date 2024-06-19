import React from 'react';
import { decode_roles } from '../../../masteredit/masteredit_utils';

const UserParser = (props) => {

    return (
        <div className='user_parser_component'>
            <h2>{decode_roles?.[props.data.role]} : {props?.data?.first_name}</h2>
        </div>
    );
}

export default UserParser;
