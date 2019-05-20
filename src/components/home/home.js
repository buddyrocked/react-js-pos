import React, { Component } from 'react';
import { connect } from 'react-redux';
import Auth from '../../services/auth';
import Navbar from '../common/navbar';


class Home extends Component {

	constructor(props) {
		super(props);
		this.state = {
			cart_count : 0,
		}
	}

	componentDidMount(){
		console.log(Auth.isAuthenticated());
	}

	render() {
		return (
			<div className="homepage">
				<Navbar /> 
				Home Page				
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		token : state.auth.token,
		username : state.auth.username,
		user_id : state.auth.user_id
	}
}

export default connect(mapStateToProps)(Home);
