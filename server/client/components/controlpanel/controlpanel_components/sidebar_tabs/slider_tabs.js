export const slidertabs_choices = {
    USERS : 'USERS',
    INFOBOOKS: "INFOBOOKS",
    TRUCKS: "TRUCKS"
}


export const tabs = [
    {
        text: "Пользователи",
        icon: "../../../../static/images/sidebar_icons/newuser.svg",
        gtRole: 3,
        tab: slidertabs_choices.USERS,
    },
    {
        text: "Справочники",
        icon: "../../../../static/images/sidebar_icons/infobook.svg",
        gtRole: 2,
        tab: slidertabs_choices.INFOBOOKS
    },
    {
        text: "Машины",
        icon: "../../../../static/images/sidebar_icons/truck.svg",
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