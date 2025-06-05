import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAILURE,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAILURE,
} from '../actions/productActions';

const initialState = {
    products: [],
    loading: false,
    error: null,
    createLoading: false,
    updateLoading: false,
    deleteLoading: false,
};

export const productReducer = (state = initialState, action) => {
    switch(action.type){
        // Fetch
        case FETCH_PRODUCTS_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_PRODUCTS_SUCCESS:
            return { ...state, loading: false, products: action.payload, error: null };
        case FETCH_PRODUCTS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        // Create
        case CREATE_PRODUCT_REQUEST:
            return { ...state, createLoading: true, error: null };
        case CREATE_PRODUCT_SUCCESS:
            return { 
                ...state, 
                createLoading: false, 
                products: [...state.products, action.payload], 
                error: null 
            };
        case CREATE_PRODUCT_FAILURE:
            return { ...state, createLoading: false, error: action.payload };

        // Delete
        case DELETE_PRODUCT_REQUEST:
            return { ...state, deleteLoading: true, error: null };
        case DELETE_PRODUCT_SUCCESS:
            return { 
                ...state, 
                deleteLoading: false, 
                products: state.products.filter(product => product.id !== action.payload), 
                error: null 
            };
        case DELETE_PRODUCT_FAILURE:
            return { ...state, deleteLoading: false, error: action.payload };

        // Update
        case UPDATE_PRODUCT_REQUEST:
            return { ...state, updateLoading: true, error: null };
        case UPDATE_PRODUCT_SUCCESS:
            return { 
                ...state, 
                updateLoading: false, 
                products: state.products.map(product => 
                    product.id === action.payload.id ? action.payload : product
                ), 
                error: null 
            };
        case UPDATE_PRODUCT_FAILURE:
            return { ...state, updateLoading: false, error: action.payload };

        default:
            return state;
    }
};