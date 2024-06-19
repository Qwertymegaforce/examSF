export const ROLES = {
    1 : "ВЫ вошли как Клиент", 
    2 : "ВЫ вошли как СО", 
    3 : "ЛК менеджера", 
    4 : "Панель администратора", 
}


export function logoutUser(setAccountState){
    localStorage.removeItem('silant_token')
    setAccountState(prevState => {
        return {
            token: null,
            name: null,
            role: null
        }
    })
}