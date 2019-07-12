import axios from 'axios';
import { Alert } from 'react';
/*import deviceStorage from '../services/deviceStorage';
import saveStorage from '../services/saveStorage';*/

export const FETCH_HOME      = 'fetch_home';
export const FETCH_PRODUCTS  = 'fetch_products';
export const FETCH_PRODUCT   = 'fetch_product';
export const FETCH_CARTS     = 'fetch_carts';
export const CREATE_CART     = 'create_cart';
export const UPDATE_CART     = 'update_cart';
export const SUBMIT_CART     = 'submit_cart';
export const FETCH_CART      = 'fetch_cart';
export const GET_CART        = 'get_cart';
export const DELETE_CART     = 'delete_cart';
export const CLEAR_CART      = 'clear_cart';
export const LOGIN           = 'login';
export const LOGOUT          = 'logout';
export const REPORT_INDEX    = 'report_index';
export const FETCH_STORES    = 'fetch_stores';
export const FETCH_STORE     = 'fetch_store';

const ROOT_URL = `http://backend-pos.local/v1/`;

export function fetchHome() {
    const request = {
                        data : {
                            title : 'Ini Title'
                        }
                    };
    return {
        type: FETCH_HOME,
        payload: request
    }
}

export const login = (values, callback, callback2) => async (dispatch, getState) => {
    try{
        let url = 'https://raw.githubusercontent.com/buddyrocked/react-js-pos/master/src/data/login.json';
        //let url = `${ROOT_URL}auth/login`;
        await axios.post(url, values)
        .then((responseJson) => {
            if(responseJson.data.token === '') {
                callback2();
            } else {
                dispatch({
                    type: LOGIN,
                    payload: responseJson
                });
                localStorage.setItem('token', responseJson.data.token);
                localStorage.setItem('user_id', responseJson.data.user_id);
                localStorage.setItem('username', responseJson.data.username);
                callback();
            }
        });

        
    }catch(e){
        console.log(e)
    }
}

export const logout = (callback) => async (dispatch, getState) => {
    try{
        await axios.get(`${ROOT_URL}auth/logout`)
        .then((responseJson) => {

            localStorage.removeItem('token');
            localStorage.removeItem('user_id');
            localStorage.removeItem('username');

            callback();

            dispatch({
                type : LOGOUT,
                payload: responseJson
            })
        });

    }catch(e){
        console.log(e)
    }
}

export const fetchProducts = (page = 1, term= 'pink') => async (dispatch, getState) => {
    try {
        //const TOKEN = getState().auth.token;
        const TOKEN = localStorage.getItem('token');
        const API_KEY = `?access-token=${TOKEN}`;

        let request = await axios.get(`${ROOT_URL}prices${API_KEY}&expand=product&page=${page}&term=${term}`);
        dispatch({ type: FETCH_PRODUCTS, payload: request });
    }catch(e){
        console.log(e)
    }
}

export const fetchProduct = (id) => async (dispatch, getState) => {
    try {
        //const TOKEN = getState().auth.token;
        const TOKEN = localStorage.getItem('token');
        const API_KEY = `?access-token=${TOKEN}`;

        let request = await axios.get(`${ROOT_URL}products/${id}${API_KEY}`);
        dispatch({type: FETCH_PRODUCT, payload: request});
    }catch(e){
        console.log(e)
    }
}

export const fetchCarts = () => async (dispatch, getState) => {
    try {
        //const TOKEN = getState().auth.token;
        const TOKEN = localStorage.getItem('token');
        const API_KEY = `?access-token=${TOKEN}`;

        let request = await axios.get(`${ROOT_URL}carts${API_KEY}`);
        console.log("Cookies are ", document.cookie);
        dispatch({type: FETCH_CARTS, payload: request});
    }catch(e){
        console.log(e)
    }
}

export const createCart = (values, callback) => async (dispatch, getState) => {
    try {
        //const TOKEN = getState().auth.token;
        const TOKEN = localStorage.getItem('token');
        const API_KEY = `?access-token=${TOKEN}`;

        await axios.post(`${ROOT_URL}carts${API_KEY}`, values)
        .then((responseJson) => {
            dispatch({type: CREATE_CART, payload: responseJson});
            callback();
        });
    }catch(e){
        console.log(e)
    }
}

export const submitCart = (values, callback) =>  async (dispatch, getState) => {
    try {
        //const TOKEN = getState().auth.token;
        const TOKEN = localStorage.getItem('token');
        const API_KEY = `?access-token=${TOKEN}`;

        let request = await axios.post(`${ROOT_URL}carts/submit${API_KEY}`, values)
        .then((responseJson) => {
            Alert.alert(responseJson.data.message);
            callback();
        });
        dispatch({type: SUBMIT_CART,payload: request});
    }catch(e){
        console.log(e)
    }
}

export const updateCart = (id, values, callback) =>  async (dispatch, getState) => {
    try {
        //const TOKEN = getState().auth.token;
        const TOKEN = localStorage.getItem('token');
        const API_KEY = `?access-token=${TOKEN}`;

        let request = await axios.put(`${ROOT_URL}carts/${id}${API_KEY}`, values)
        .then((responseJson) => {
            Alert.alert(responseJson.data.message);
            callback();
        });
        dispatch({type: UPDATE_CART, payload: request});
    }catch(e){
        console.log(e)
    }
}

export const fetchCart = () =>  async (dispatch, getState) => {
    try {
        //const TOKEN = getState().auth.token;
        const TOKEN = localStorage.getItem('token');
        const API_KEY = `?access-token=${TOKEN}`;

        let request = await axios.get(`${ROOT_URL}carts${API_KEY}`);
        dispatch({type: FETCH_CART, payload: request});
    }catch(e){
        console.log(e)
    }
}

export const getCart = () => async (dispatch, getState) => {
    try {
        //const TOKEN = getState().auth.token;
        const TOKEN = localStorage.getItem('token');
        const API_KEY = `?access-token=${TOKEN}`;

        let request = await axios.get(`${ROOT_URL}carts${API_KEY}`);
        dispatch({type: GET_CART, payload: request});
    }catch(e){
        console.log(e)
    }
}

export const deleteCart = (id, callback) => async (dispatch, getState) => {
    try {
        //const TOKEN = getState().auth.token;
        const TOKEN = localStorage.getItem('token');
        const API_KEY = `?access-token=${TOKEN}`;

        await axios.delete(`${ROOT_URL}carts/${id}${API_KEY}`)
        .then(() => callback());
        dispatch({type: DELETE_CART, payload: id});
    }catch(e){
        console.log(e)
    }
}

export const clearCart = (callback) => async (dispatch, getState) => {
    try {
        //const TOKEN = getState().auth.token;
        const TOKEN = localStorage.getItem('token');
        const API_KEY = `?access-token=${TOKEN}`;

        let request = await axios.delete(`${ROOT_URL}carts/clear-cart${API_KEY}`)
        .then(() => callback());
        dispatch({type: CLEAR_CART,payload: request});
    }catch(e){
        console.log(e)
    }
}

export const reportIndex = () => async (dispatch, getState) => {
    try {
        //const TOKEN = getState().auth.token;
        const TOKEN = localStorage.getItem('token');
        const API_KEY = `?access-token=${TOKEN}`;

        let request = await axios.get(`${ROOT_URL}reports${API_KEY}`);
        dispatch({type: REPORT_INDEX, payload: request});
    }catch(e){
        console.log(e)
    }
}

export const fetchStores = () => async (dispatch, getState) => {
    try {
        //const TOKEN = getState().auth.token;
        const TOKEN = localStorage.getItem('token');
        const API_KEY = `?access-token=${TOKEN}`;

        let request = await axios.get(`${ROOT_URL}stores${API_KEY}`);
        dispatch({type: FETCH_STORES, payload: request});
    }catch(e){
        console.log(e)
    }
}

export const fetchStore = (id) => async (dispatch, getState) => {
    try {
        //const TOKEN = getState().auth.token;
        const TOKEN = localStorage.getItem('token');
        const API_KEY = `?access-token=${TOKEN}`;

        let request = await axios.get(`${ROOT_URL}stores/${id}${API_KEY}`);
        dispatch({type: FETCH_STORE, payload: request});
    }catch(e){
        console.log(e)
    }
}
