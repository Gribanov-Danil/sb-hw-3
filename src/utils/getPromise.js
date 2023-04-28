import axios from "axios";

export const getPromise = async (str) => {
    return axios.get(str)
        .then((res) => res.data)
        .then((data) => data.name)
}