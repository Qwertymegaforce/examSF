import React from 'react';
import {useOutletContext} from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import SearchDiv from './mainpage_components/SearchDiv';
import ContentDiv from './mainpage_components/ContentDiv';
import { getUserMainPageData, searchDataByUmn } from './mainpage_components/mainpage_utils';
import TabsDiv from './mainpage_components/TabsDiv';
import { machine_tabs_values } from './mainpage_components/mainpage_utils';
import { Navigate } from 'react-router-dom';
import FiltersDiv from './mainpage_components/FiltersDiv';
import MasterSort from '../mastertable/MasterSort';


const MainPage = () => {

    let [infoState, setInfoState] = React.useState({
        data: null,
        tab: machine_tabs_values.BRIEF,
        umn: null,
        applyFilters: false,
        filters: [],
        sorting: null,
        applySorting: false
    })

    let context = useOutletContext()
    let params = useParams()
    let navigate = useNavigate()
    let avoidRequest = React.useRef(false)
    let init_token = React.useRef(context.accountState.token)

    React.useEffect(()=>{
        if(context.accountState.token && [1,2].includes(context.accountState.role)){
            getUserMainPageData({token : context.accountState.token, setState : setInfoState, tab : infoState.tab})
        }
        else if (params.umn && !avoidRequest.current){
            avoidRequest.current = true
            searchDataByUmn({token : context.accountState.token, setState : setInfoState, tab : infoState.tab, umn: params.umn})
        }   
    }, [infoState.tab, context.accountState.role, params.umn])
    
    React.useLayoutEffect(()=>{
        if(init_token.current !== context.accountState.token){
            setInfoState(prevState => {
                avoidRequest.current = false
                return {
                    data: null,
                    tab: machine_tabs_values.BRIEF,
                    umn: null,
                    filters: [],
                    sorting: null,
                    applyFilters: false,
                    applySorting: false
                }
            })
            navigate("/")
        }
    }, [context.accountState.token])

    if((params.umn && [1, 2].includes(context.accountState.role))){
        return <Navigate to={'/'}/>
    }


    return (
        <div className='main_page_component'>
            {!context.accountState.token 
                || 
            [3, 4].includes(context.accountState.role) 
                ? 
            <SearchDiv 
                token={context.accountState.token} 
                role = {context.accountState.role} 
                setState={setInfoState}
                umn = {infoState.umn}
                avoidRequest = {avoidRequest}
            /> 
                : 
            null
            }

            {infoState.data
                &&  
            context.accountState.role
                ? 
            <TabsDiv 
                setState={setInfoState} 
                role={context.accountState.role} 
                token={context.accountState.token} 
                tab={infoState.tab} 
                state={infoState}
                avoidRequest={avoidRequest}
            /> 
                : 
            null
            }

            {
            infoState.sorting
                &&
            <MasterSort
                sorting = {infoState.sorting}
                setState = {setInfoState}
                applySorting = {infoState.applySorting}
            />
            }

            {
            infoState.filters.length > 0
                &&
            <FiltersDiv
                filters = {infoState.filters}
                setState = {setInfoState}
                applyFilters = {infoState.applyFilters}
            />
            }

            {infoState.data
                && 
            <ContentDiv 
                data={infoState.data}
                filters = {infoState.filters}
                sorting = {infoState.sorting}
                tab={infoState.tab} 
                token={context.accountState.token} 
                role={context.accountState.role}
                setState = {setInfoState}
                applyFilters = {infoState.applyFilters}
                applySorting = {infoState.applySorting}
            />
            }
        </div>
    );
}

export default MainPage;
