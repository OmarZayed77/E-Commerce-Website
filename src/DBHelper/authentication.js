import Axios from 'axios';

const url = process.env.REACT_APP_BASE_URL || 'https://e-commerce-back-end.herokuapp.com';

export const register = (value) => {
    return Axios.post(`${url}/users`, value);
}

export const login = (value) => {
    return Axios.post(`${url}/login`, value);
}