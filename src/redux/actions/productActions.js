import { toast } from 'react-toastify';

// fetch
export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE'; 

// create
export const CREATE_PRODUCT_REQUEST = 'CREATE_PRODUCT_REQUEST';
export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';
export const CREATE_PRODUCT_FAILURE = 'CREATE_PRODUCT_FAILURE';

// delete
export const DELETE_PRODUCT_REQUEST = 'DELETE_PRODUCT_REQUEST';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_FAILURE = 'DELETE_PRODUCT_FAILURE';

//update
export const UPDATE_PRODUCT_REQUEST = 'UPDATE_PRODUCT_REQUEST';
export const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';
export const UPDATE_PRODUCT_FAILURE = 'UPDATE_PRODUCT_FAILURE';

// fetch all products
export const fetchProducts = () => async (dispatch) => {
    dispatch({ type: FETCH_PRODUCTS_REQUEST });
    try {
        const response = await fetch('https://fakestoreapi.com/products',
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        );
        let data = await response.json();
        data = data.map(product => ({
            ...product,
            banner: product.image
        }));
        dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error.message });
    }
}

// create product
export const createProduct = (product) => async (dispatch) => {
    dispatch({ type: CREATE_PRODUCT_REQUEST });
    try {
        const response = await fetch('https://fakestoreapi.com/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });
        const data = await response.json();
        dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
        toast.success('Product created successfully!');
    } catch (error) {
        dispatch({ type: CREATE_PRODUCT_FAILURE, payload: error.message });
        toast.error('Failed to create product.');
    }
}

// delete product
export const deleteProduct = (id) => async (dispatch) => {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    try {
        await fetch(`https://fakestoreapi.com/products/${id}`, {
            method: 'DELETE',
        });
        dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: id });
        toast.success('Product deleted successfully!');
    } catch (error) {
        dispatch({ type: DELETE_PRODUCT_FAILURE, payload: error.message });
        toast.error('Failed to delete product.');
    }
}

// update product
export const updateProduct = (id, product) => async (dispatch) => {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });
        let data = await response.json();
        // Ensure banner is set
        data = { ...data, banner: data.image || data.banner };
        dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data });
        toast.success('Product updated successfully!');
    } catch (error) {
        dispatch({ type: UPDATE_PRODUCT_FAILURE, payload: error.message });
        toast.error('Failed to update product.');
    }
}