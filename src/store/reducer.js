import * as actions from './actions/actions';

const initialState = {
    products: [],
    selectedProduct: {},
    categories: [],
    isLoggedIn: false,
    token: "",
    userId: ""
}

const productReducer = (state = initialState, action) => { 
    let newProducts = [...state.products];
    let newProduct = {...state.product};
    let newCategories = [...state.categories];
    switch(action.type)
    {
        case actions.GET_ALL_PRODUCTS:
            newProducts = action.payload;
            break;
        case actions.GET_ALL_CATEGORIES:
            newCategories = action.payload;
            break;
        case actions.GET_PRODUCT:
            newProduct= action.payload;
            break;
        case actions.ADD_PRODUCT:
            newProducts.push(action.payload);
            window.alert('New Product Added Successfully');
            break;
        case actions.DELETE_PRODUCT: 
            const productIndex = newProducts.findIndex(p => p._id.toString() === action.payload.toString());
            if(productIndex > -1)
            {
                newProducts.splice(productIndex, 1);         
            }
            window.alert('Product Deleted Successfully');
            break;
        case actions.REGISTER:
            window.alert('Registered Successfully, Try to Login');
            break;
        case actions.LOGIN:
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.userId = action.payload.userId;
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('userId', action.payload.userId);
            break;
        case actions.LOGOUT:
            state.isLoggedIn = false;
            state.token = "";
            state.userId = "";
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            window.alert('You Logged Out!');
            break;
        default:
            break;
    }   
    return {
        ...state,
        products: newProducts,
        selectedProduct: newProduct,
        categories: newCategories
    };
}

export default productReducer;