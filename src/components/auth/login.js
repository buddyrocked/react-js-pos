import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { login } from '../../actions';


class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showAlert : false,
			route     : 'Login',
			username  : 'superadmin',
			password  : 'superadmin',
			loading	  : false,
		};
	};

	render() {
		return (
			<div className="test">
				Login Page
			</div>
		);
	}
}

export default Login;
