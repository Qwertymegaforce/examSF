import React from 'react';
import PanelWorkSpace from './masterpanel_components/PanelWorkSpace';
import PanelEditTable from './masterpanel_components/PanelEditTable';
import { edit_del_tabs, edit_del_tabs_values} from './masterpanel_components/masterpanel_utils';
import { slidertabs_choices } from './sidebar_tabs/slider_tabs';
import Tab from './masterpanel_components/Tab';


const MasterPanelEdit = (props) => {

    let [currentTab, setCurrentTab] = React.useState(edit_del_tabs_values.CREATE)

    
    let tabs = edit_del_tabs.map((tab, index) => {
        return(
            <Tab 
                key={index} 
                text={tab.text} 
                setValue={tab.tab} 
                selectedTab={currentTab} 
                setState={setCurrentTab}
            />
        )
    })

    React.useEffect(()=>{
        if(props.selectedTab == slidertabs_choices.TRUCKS){
            setCurrentTab(edit_del_tabs_values.CREATE)
        }
    }, [props.selectedTab])

    return (
        <div className='master_panel_component'>
            <div 
                className="create_or_edit_header"
                style={{
                    display: props.selectedTab == slidertabs_choices.TRUCKS? "none" : null
                }}
            >
                {tabs}
            </div>
        {currentTab==edit_del_tabs_values.CREATE? <PanelWorkSpace currentTab={props.selectedTab} token={props.token}/> : null}
        {currentTab==edit_del_tabs_values.EDIT? <PanelEditTable currentTab={props.selectedTab} token={props.token}/> : null}
        </div>
    );
}

export default MasterPanelEdit;
