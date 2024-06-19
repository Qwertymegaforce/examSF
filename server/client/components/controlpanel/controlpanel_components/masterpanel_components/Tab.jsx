import React from 'react';

const Tab = (props) => {
    return (
        <div 
            className='master_panel_tab' 
            onClick={()=>{props.setState(props.setValue)}}
            style={{
                backgroundColor: props.selectedTab == props.setValue? "var(--selection-blue)" : null
            }}
        >
            <p>{props.text}</p>
        </div>
    );
}

export default Tab;
