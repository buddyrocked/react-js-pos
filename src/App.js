import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';


import reducers from './reducers';
import MainPage from './components/main_page';
import logo from './logo.svg';
import './App.css';

const store = createStore(reducers, applyMiddleware(promise, thunk));

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = { cartCount : 0 }
    }

    render() {
        return (
            <Provider store={store}>
                <MainPage />
            </Provider>
        );
    }
}