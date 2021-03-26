import axios from "axios";

//Task List:
//Build and export a function used to send in our authorization token

export const axiosWithAuth = (url) => {
    const token = localStorage.getItem('token');

    return axios.create({
        baseURL: url,
        headers: {
            authorization: token
        }
    })
}