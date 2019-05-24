import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { Route, Switch } from 'react-router-dom';


import reducers from './reducers';
import Home from './components/home/home';
import Intro from './components/home/intro';
import Login from './components/auth/login';
import Profile from './components/profile/index';
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
                <Switch>
                    <Route exact path='/login' component={Login} />
                    <UnsecuredRoute path='/' component={Home} withSidebar="true" />
                    <SecuredRoute path='/profile' component={Profile} withSidebar="true" />
                    <SecuredRoute path='/intro' component={Intro} withSidebar="true" />
                </Switch>
            </Provider>
        );
    }
}