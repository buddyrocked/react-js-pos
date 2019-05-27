import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import reducers from './reducers';
import Home from './components/home/home';
import Intro from './components/home/intro';
import Login from './components/auth/login';
import Profile from './components/profile/index';
import Products from './components/product/index';
import SecuredRoute from './helpers/SecuredRoute';
import UnsecuredRoute from './helpers/UnsecuredRoute';
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
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/login' component={Login} />
                        <UnsecuredRoute exact path='/' component={Home} withSidebar="true" />
                        <SecuredRoute exact path='/profile' component={Profile} withSidebar="true" />
                        <SecuredRoute exact path='/intro' component={Intro} withSidebar="true" />
                        <SecuredRoute exact path='/products' component={Products} withSidebar="true" />
                    </Switch>
                </BrowserRouter>
            </Provider>
        );
    }
}