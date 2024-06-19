import { truck_inputs } from "../controlpanel/controlpanel_components/masterpanel_components/masterpanel_utils"
import { service_inputs } from "../mastercreator/master_create_utils"
import { complaint_inputs } from "../mastercreator/master_create_utils"
import { infobook_inputs } from "../controlpanel/controlpanel_components/masterpanel_components/masterpanel_utils"


export function redirectCheck(details, token, role){
    if(!["machine", "service", "complaint", "infobook"].includes(details)) return true
    if(!token || !role) return true
    if(role < 3 && details == "machine") return true
    if(role < 3 && details == "infobook") return true
    if(role < 2 && details == "complaint") return true
    return false
}


export const edit_inputs_to_render = {
    "machine": truck_inputs,
    "service": service_inputs,
    "complaint": complaint_inputs,
    "infobook": infobook_inputs.slice(0, 1).concat(infobook_inputs.slice(2, 3))
}


export const decode_roles = {
    1: "Владелец",
    2: "Сервисная организация"
}


export const params_to_classes = {
    "machine": "machine_edit_component",
    "service": "service_edit_component",
    "complaint": "complaint_edit_component",
    "infobook": "infobook_edit_component"
}