import React from 'react';
import { useLocation, useParams, useOutletContext } from 'react-router';
import { Link } from 'react-router-dom';
import { HTTP, DOMAIN, API, VERSION, SPECIFIC} from '../../utils/paths';
import { Navigate } from 'react-router';
import MachineView from './detailedview_components/MachineView';
import ComplaintView from './detailedview_components/ComplaintView';
import ServiceView from './detailedview_components/ServiceView';


const DetailView = () => {

    let params = useParams()

    if(!["machine", "service", "complaint"].includes(params.instance)){
        return <Navigate to={'/'}/>
    }

    let location = useLocation()
    let token = useOutletContext().accountState.token
    let [detailState, setDetailState] = React.useState()

    React.useEffect(()=>{
        fetch(HTTP + DOMAIN + API + VERSION + SPECIFIC + `/${params.instance}` + `/${params.id}`, {
            headers: {
                ...(token && {"Token" : token})
            }
        })
          .then(res=>res.json())
          .then(data=>setDetailState(data[0]))

    }, [location])


    return (
        <>
            {
            detailState
                &&
            <div className="detail_view_component">
                {params.instance == "machine" && <MachineView data = {detailState} token={token}/>}
                {params.instance == "service" && <ServiceView data = {detailState} token={token}/>}
                {params.instance == "complaint" && <ComplaintView data = {detailState} token={token}/>}
            </div>
            }
        </>
    );
}

export default DetailView;
