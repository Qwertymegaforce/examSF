import React from 'react';  
import { useOutletContext } from 'react-router';
import ControlSidebar from './controlpanel_components/ControlSidebar';
import { setInitTab } from './controlpanel_components/sidebar_tabs/slider_tabs';
import MasterPanelEdit from './controlpanel_components/MasterPanelEdit';
import { Navigate } from 'react-router-dom';


const ControlPanel = () => {

    const context = useOutletContext()
    let [selectedTab, setSelectedTab] = React.useState('')


    React.useEffect(()=>
    {
        if (context.accountState.role)
        {
            setSelectedTab(setInitTab(context.accountState.role))
        }
    }, [context.accountState.role])

    if(!context.accountState.token)
    {
        return (<Navigate to={"/"}/>)
    }

    return (
        <div className='control_panel_component'>
            <ControlSidebar 
                role={context.accountState.role} 
                selectedTab={selectedTab} 
                setSelectedTab={setSelectedTab}
            />
            <div className='control_inputs_div'>
                <MasterPanelEdit 
                    selectedTab={selectedTab} 
                    token={context.accountState.token}
                />
            </div>
        </div>
    );
}
export default ControlPanel;
