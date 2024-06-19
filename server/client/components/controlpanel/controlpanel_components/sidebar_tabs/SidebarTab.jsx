import React from 'react';

const SidebarTab = (props) => {
    return (
        <div 
            className='slider_tab_div' 
            onClick={()=>{props.setSelectedTab(prevTab=>props.tab)}}
            style={{backgroundColor: props.currentTab == props.tab? "var(--selection-blue)" : null}}
        >
            <img src={props.icon}/>
            <p>{props.text}</p>
        </div>
    );
}

export default SidebarTab;
