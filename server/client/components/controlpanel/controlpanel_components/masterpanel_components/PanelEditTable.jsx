import React from 'react';
import MasterHeader from '../../../mastertable/MasterHeader';
import MasterBody from '../../../mastertable/MasterBody';
import { table_headers, getTableData, controlpanel_parsers, add_controlpanel_buttons,} from './masterpanel_utils';
import { slidertabs_choices } from '../sidebar_tabs/slider_tabs';
import { panel_edit_classes } from './masterpanel_utils';




const PanelEditTable = (props) => {
    
    let [bodydata, setBodyData] = React.useState([])

    React.useEffect(()=>{
        getTableData(props.currentTab, props.token, setBodyData)
    }, [props.currentTab])

    return (
        <table
            className={`controlpanel_table ${panel_edit_classes[props.currentTab]}`}
        >
            <MasterHeader 
                headers={table_headers[props.currentTab]}
                additionalHeaders = {props.currentTab == slidertabs_choices.USERS? [{title: "Удалить"}] : [{title: "Изменить"}]}
            />
            {
            props.currentTab !== slidertabs_choices.TRUCKS
                &&
            <MasterBody
                data = {bodydata}
                parseBy = {controlpanel_parsers[props.currentTab]}
                addButtons = {add_controlpanel_buttons[props.currentTab]}
                context = {
                    {
                        tab: props.currentTab,
                        token: props.token,
                        setState: setBodyData
                    }    
                }
            />
            }
        </table>
    );
}

export default PanelEditTable;
