import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { Route } from 'react-router-dom';


import reducers from './reducers';
import MainPage from './components/main_page';
import Home from './components/home/home';
import Intro from './components/home/intro';
import Login from './components/auth/login';
import Profile from './components/profile/index';
import SecuredRoute from './helpers/SecuredRoute';
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
                <Route exact path='/' component={Home}/>
                <Route exact path='/intro' component={Intro}/>
                <Route exact path='/login' component={Login}/>
                <SecuredRoute path='/profile' component={Profile}/>
            </Provider>
        );
    }
}