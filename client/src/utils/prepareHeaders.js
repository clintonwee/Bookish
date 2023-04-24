import useToken from "./useToken"

export function prepareHeaders(token) {
    return {
        Authorization: 'Bearer ' + token
    }
}

