import { types } from "../masterinput/master_utils"
import { validators } from "../masterinput/master_utils"

export const auth_inputs = [
    {
        placeholder: "Логин",
        id: "username",
        type: types.CHARFIELD,
        validators: [validators.NOT_NULL]
    },
    {
        placeholder: "Пароль",
        id: "password",
        type: types.CHARFIELD,
        validators: [validators.NOT_NULL],
        ispassword: true
    }

]