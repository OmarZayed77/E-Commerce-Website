import Axios from 'axios';

const url = process.env.REACT_APP_BASE_URL || 'https://e-commerce-back-end.herokuapp.com';

export const getAllCategories = () => {
    return Axios.get(`${url}/categories`);
}

export const getById = (categoryId) => {
    return Axios.get(`${url}/categories/${categoryId}`);
}