import { getToken } from "../components/auth/auth-helper"
let apiURL = process.env.REACT_APP_APIURL

const listActive = async () => {
    try {
        let response = await fetch(apiURL + '/ads/active/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

