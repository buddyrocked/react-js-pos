import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import _ from 'lodash';
import { login } from '../../actions';


class Login extends Component {

	constructor(props) {
    super(props);
    this.state = {
			showAlert: false,
			route    : 'Login',
			username : 'superadmin',
			password : 'superadmin',
			loading  : false,
		};
	};

	userLogin(e){
		this.setState({
			loading : true,
		});

		const values = JSON.stringify({
			username : this.state.username,
			password : this.state.password
		});

		this.props.onLogin(values, () => {
		  	this.setState({
		    	loading : false,
		  	});
		});

		e.preventDefault();
	}

	showAlert = () => {
		this.setState({
		  	showAlert: true
		});
	};

	hideAlert = () => {
		this.setState({
		  	showAlert: false
		});
	};

  	

  	render() {
    	const { handleSubmit } = this.props;
    	const {showAlert} = this.state;

    	return (
      		<div>
        		<hr />
        		<input
        			type="text"
                 	placeholder='Username'
                 	value={this.state.username}
                 	onChange={(text) => this.setState({ username: text })} />

              	<input
              		type="password"
                  	placeholder='Password'
                  	value={this.state.password}
                  	onChange={(text) => this.setState({ password: text })} />

              	<button
                	onClick={ (e) => this.userLogin(e) } >
                	SIGN IN
              	</button>
      		</div>
    	);
  	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		//token : state.auth.token
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onLogin: (values, callback) => { dispatch(login(values, callback)) },
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);