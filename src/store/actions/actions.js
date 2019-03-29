import * as productsDB from '../../DBHelper/product';
import * as categoriesDB from '../../DBHelper/categories';
import * as authDB from '../../DBHelper/authentication';

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES';
export const GET_PRODUCT = 'GET_PRODUCT';
export const REGISTER = 'REGISTER';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';


export const getAllProducts = () => {
    return dispatch => {
        productsDB.getAllProducts().then(res => {
            dispatch({type: GET_ALL_PRODUCTS, payload: res.data});
        })
        .catch(console.log);
    }
}

export const getAllCategories = () => {
    return dispatch => {
        categoriesDB.getAllCategories().then(res => {
            dispatch({type: GET_ALL_CATEGORIES, payload: res.data});
        })
        .catch(console.log);
    }
}

export const register = (value) => {
    return dispatch => {
        authDB.register(value).then(res => {
            dispatch({type: REGISTER});
        })
        .catch(console.log);
    }
}

export const login = (value) => {
    return dispatch => {
        authDB.login(value).then(res => {
            dispatch({type: LOGIN, payload: res.data});
        })
        .catch(console.log);
    }
}



export const getProductByIdSuccess = (product) => {
    return {type: GET_PRODUCT, payload: product}
}

export const getProductById = (id) => {
    return dispatch => {
        let product;
        productsDB.getById(id)
        .then(res => {
            product = res.data;
            return categoriesDB.getById(product.categoryId);
        })
        .then(res => {
            product.category = res.data.name;
            dispatch(getProductByIdSuccess(product));
        })
        .catch(console.error);
    }
}

export const addProductSuccess = (product) => {
    return {type: ADD_PRODUCT, payload: product}
}

export const addProduct = (product, token) => {
    return dispatch => {
        productsDB.addProduct(product, token)
        .then(res => dispatch(addProductSuccess(res.data)))
        .catch(console.error);
    }
}

export const deleteProductSuccess = (id) => {
    return {type: DELETE_PRODUCT, payload: id}
}

export const deleteProduct = (id, token) => {
    return dispatch => {
        if(window.confirm('Are You Sure you want to permanentely delete the product ?!'))
        {
            productsDB.deleteProduct(id, token)
            .then(res => dispatch(deleteProductSuccess(id)))
            .catch(console.error);
        }
    }
}