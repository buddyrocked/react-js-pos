import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchCarts, getCart, clearCart, logout } from '../actions'; 
import Home from './home/home';
import Intro from './home/intro';
import Login from './auth/login';

class MainPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			cart_count : 0
		}
	}

	componentDidMount() {
		this.setState({
			cart_count : 99
		});
	}

	render() {
		if (this.props.token !== '') {
			return <Home />
		} else {
			return (
				<div> 
					<Login />
				</div>
			);
		}
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		token : state.auth.token,
		username : state.auth.username,
		user_id : state.auth.user_id
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onClearCart : (callback) => { dispatch(clearCart(callback)); },
	    onGetCart : () => { dispatch(getCart()); },
	    onFetchCarts : () => { dispatch(fetchCarts()); },
	    onLogout: (callback) => { dispatch(logout(callback)); },
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
