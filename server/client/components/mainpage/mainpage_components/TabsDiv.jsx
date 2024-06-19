import React from 'react';
import { SEARCHED } from '../../../utils/constants';
import { machine_tabs } from './mainpage_utils';
import Tab from '../../controlpanel/controlpanel_components/masterpanel_components/Tab';

function Tabs(props){
    let tabs = machine_tabs.map((tab, index) => {
        return(
            <Tab 
                key={index} 
                text={tab.text} 
                setValue={tab.tab} 
                selectedTab={props.tab} 
                setState={(value)=>{
                    props.avoidRequest.current = false
                    props.setState(prevState => {
                    return {
                        ...prevState,
                        filters: [],
                        tab: value
                    }
                })}}
            />
        )
    })
    return (
        <div className='search_tabs' >
            {tabs}
        </div>
    )
}

const TabsDiv = (props) => {
    return (
        <>  
            <div className="mainpage_signs">
                {[1,2].includes(props.role)? <h1>Вы авторизовались как {props.role == 1? 'Клиент' : 'Сервисная компания'}</h1> : null}
                <h1>{SEARCHED}</h1>
            </div>
            {<Tabs avoidRequest={props.avoidRequest} setState={props.setState} tab={props.tab}/>}
        </>
    );
}

export default TabsDiv;
