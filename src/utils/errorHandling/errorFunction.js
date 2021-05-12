/* eslint-disable default-case */
import {userNotFound, wrongPassword, emailBadlyFormatted, shortPassword} from '../errorHandling/errorMessages';

//login
export const loginErrorMessage = (code) => {

    switch (code) {
        case "auth/user-not-found": 
            alert(userNotFound)
            break
        case "auth/wrong-password":
            alert(wrongPassword)
            break
        default:
            alert(code)
    }
}

//signup
export const signupErrorMessage = (code) => {

    switch (code) {
        case "auth/invalid-email":
            alert(emailBadlyFormatted);
            break
        case "auth/weak-password":
            alert(shortPassword);
            break
        default:
            alert(code)
    }
}