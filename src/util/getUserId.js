import { jwtDecode } from "jwt-decode";


export const getUserId = (token) => {
    const decoded = jwtDecode(token)
    return decoded._id
}


export const getUserIdFromLocalStorage = () => {
    return localStorage.getItem("userId")
}

