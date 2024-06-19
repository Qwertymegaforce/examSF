import React from 'react';
import { useParams} from 'react-router';
import { useOutletContext } from 'react-router';
import MachineButtons from './utils_components/MachineButtons';
import AdditionalInfo from './utils_components/AdditionalInfo';
import { infoParser } from './utils_components/utilscomponents_utils';

const MachineView = (props) => {

    let id = useParams().id
    let context = useOutletContext()

    let [displayInfo, setDisplayInfo] = React.useState(props.token? true : false)

    React.useEffect(()=>{
        if(!props.token){
            setDisplayInfo(false)
        }
    }, [props.token])

    let [infobooks, users] = infoParser(props.data)

    return (
        <div className='machine_view_component'>
            <div className="infobook_info">
                <h1>Технические подробности</h1>
                <div className="infobook_info_list">
                    {infobooks}
                </div>
            </div>
            {displayInfo 
                &&
            <div className="user_info">
                <h1>Информация о пользователях</h1>
                <div className="user_list">    
                    {users}
                </div>
            </div>}
            {
            displayInfo 
                && 
            <AdditionalInfo data={props.data}/>
            }
            {context.accountState.role && <MachineButtons role={context.accountState.role} id={id}/>}
        </div>
    );
}

export default MachineView;
