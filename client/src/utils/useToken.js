import {useState} from 'react';
import axios from "axios"

function useToken() {

    function getToken() {
        const userToken = localStorage.getItem('token');
        return userToken && userToken
    }

    const [token, setToken] = useState(getToken());

    async function getProfile() {
        if (token) {
            const headers = prepareHeaders()
            const res = await axios.get("/profile", headers )
            return res.data;
        } else {
            return { status: "error" }
        }
    }


    function prepareHeaders() {
        return {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
    }

    function saveToken(userToken) {
        localStorage.setItem('token', userToken);
        setToken(userToken);
    };

    function removeToken() {
        localStorage.removeItem("token");
        setToken(null);
    }

    return {
        setToken: saveToken,
        token,
        removeToken,
        prepareHeaders,
        getProfile
    }

}

export default useToken;