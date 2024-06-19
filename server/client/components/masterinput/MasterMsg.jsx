import React from 'react';

const MasterMsg = (props) => {

    return (
        <>
        {
        !props?.preventShowing
            &&
        <p 
            className={props?.settings?.errors? 'incorrect_sign' : "correct_sign"}
            style={
                {
                    display: props?.settings?.msg? null : "none"
                }
            }
        >
            {props?.settings?.msg}
        </p>
        }
        </>
    );
}

export default MasterMsg;
