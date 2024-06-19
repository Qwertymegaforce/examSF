import React from 'react';
import { useNavigate } from 'react-router-dom';
import { bodyDisabler } from '../../../utils/functions';


const MsgPopUp = (props) => {

    let navigate = useNavigate()

    function redirectMain()
    {
        bodyDisabler(true)
        navigate('/')
    }

    React.useEffect(()=>{
        if(props?.settings?.details) bodyDisabler(false)
    }, [props?.settings])


    return (
        <>
        {
        props?.settings?.details
            &&
        <div 
            className='edit_msg_popup'
            style={
                {
                    pointerEvents: "auto"
                }
            }
            
        >
            <p>{props.settings.msg}</p>
            
            <button 
            onClick={redirectMain}
            className='basic_button'
            >
                На главную
            </button>
        </div>
        }

        </>
    );
}

export default MsgPopUp;
