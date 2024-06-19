import React from 'react';
import SidebarTab from './sidebar_tabs/SidebarTab';
import { tabs } from './sidebar_tabs/slider_tabs';

const ControlSidebar = (props) => {

    let tabs_components = tabs.filter(tab => {
        if (props.role > tab.gtRole){
            return true
        } else return false
    }).map((tab, index)=>{
        return <SidebarTab 
            key = {index}
            text = {tab.text}
            icon = {tab.icon}
            tab = {tab.tab}
            currentTab = {props.selectedTab}
            setSelectedTab = {props.setSelectedTab}
        />
    })

    return (
        <div className='control_sidebar_component'>
            {tabs_components}
        </div>
    );
}

export default ControlSidebar;
