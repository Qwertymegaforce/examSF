import React from 'react';
import { Link } from 'react-router-dom';
import quitLogo from '../../../../static/images/util_logos/exit.svg';
import loadLogo from '../../../../static/images/util_logos/loading.svg';
import { ROLES, logoutUser } from './header_utils/header_utils';
import { HTTP, DOMAIN, API, VERSION, GETUSERDATA } from '../../../../utils/paths';

const AccountData = (props) => {

    function signOut()
    {
        logoutUser(props.setAccountState)
    }
    
    React.useEffect(()=>
    {
        if(props.token)
        {
            fetch(HTTP + DOMAIN + API + VERSION + GETUSERDATA, 
                {
                    headers: 
                    {
                        "Token": props.token
                    }
                }
            )
            .then(response => 
                {
                    if(response.ok) return response.json()
                    else Promise.reject()
                }
            )
            .then(data=> 
                {
                    props.setAccountState(prevState => 
                            {
                                return {
                                    ...prevState,
                                    name: data.name,
                                    role: data.role
                                }
                            }
                        )
                }
            )
            .catch(err=>
                {
                    logoutUser(props.setAccountState)
                }
            )
        }
    }, [props.token])
    
    return (

        <div className="header_signed_up"> 
            {props.name && props.role? 
            <>
                <div>
                    <p>{props.name}</p>
                    <Link to={[3,4].includes(props.role)? 'controlpanel' : null} className='LK_link'>{ROLES[props.role]}</Link>
                </div>
                <a onClick={signOut} className="quit_link" data_title = "Выйти"><img src={quitLogo} alt="" /></a>
            </>
            :
            <div className='load_logo'><img src={loadLogo}/></div>}
        </div> 
    );
}

export default AccountData;
