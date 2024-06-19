import newUser from "../../../../static/images/sidebar_icons/newuser.svg"
import infobook from "../../../../static/images/sidebar_icons/infobook.svg"
import truck from "../../../../static/images/sidebar_icons/truck.svg"


export const slidertabs_choices = {
    USERS : 'USERS',
    INFOBOOKS: "INFOBOOKS",
    TRUCKS: "TRUCKS"
}


export const tabs = [
    {
        text: "Пользователи",
        icon: newUser,
        gtRole: 3,
        tab: slidertabs_choices.USERS,
    },
    {
        text: "Справочники",
        icon: infobook,
        gtRole: 2,
        tab: slidertabs_choices.INFOBOOKS
    },
    {
        text: "Машины",
        icon: truck,
        gtRole: 2,
        tab: slidertabs_choices.TRUCKS
    }
]


export function setInitTab(role){
    if (role == 4){
        return slidertabs_choices.USERS
    }
    else if (role == 3) {
        return slidertabs_choices.TRUCKS
    }
    else return null
}