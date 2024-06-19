import React from 'react';
import DropContent from './DropContent';
import { HTTP, DOMAIN, API, VERSION, SPECIFICUSERS } from '../../utils/paths';
import { changeUserList } from '../controlpanel/controlpanel_components/masterpanel_components/masterpanel_utils';


const DropUserContent = (props) => {

    let [userlist, setUserlist] = React.useState([])

    React.useEffect(()=>{
        if(props.name){
            let formData = new FormData()
            formData.append('name', props.name)
            formData.append('role', props.role)
            fetch(HTTP + DOMAIN + API + VERSION + SPECIFICUSERS, {
                method: "POST",
                headers: {
                    "Token": props.token
                },
                body: formData
            })
              .then(res=>res.json())
              .then(data => setUserlist(data))
        }
        else {
            setUserlist([])
        }
    }, [props.name])

    return (
        <DropContent                        
            display = {props?.display}
            actualValue = {'value'}
            id = {props.id}
            list = {changeUserList(userlist)}
            childClassname = {'dropitem'}
            setState = {props.setState}
        />
    );
}

export default DropUserContent;
