import Axios from 'axios';

const url = process.env.REACT_APP_BASE_URL || 'https://e-commerce-back-end.herokuapp.com';

export const getAllProducts = () => {
    return Axios.get(`${url}/products`);
}

export const getById = (productId) => {
    return Axios.get(`${url}/products/${productId}`);
}

export const getByCategoryId = (categoryId) => {
    return Axios.get(`${url}/categories/${categoryId}/products`);
}

export const getUserProducts = (userId, token) => {
    return Axios.get(`${url}/users/${userId}/products`, {headers: {Authorization: token}});
}

export const addProduct = (product, token) => {
    return Axios.post(`${url}/products`, product, {headers: {Authorization: token}});
}

export const deleteProduct = (productId, token) => {
    return Axios.delete(`${url}/products/${productId}`, {headers: {Authorization: token}});
}
