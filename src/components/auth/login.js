import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import _ from 'lodash';
import { login } from '../../actions';
import Navbar from '../common/navbar';


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
		  	this.props.history.push('/');
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
    	const { showAlert } = this.state;

    	return (
      		<div>
      			<Navbar />
      			<div className="container">
      				<div className="row">
      					<div className="col-xs-12">
			        		<form>
			        			<div className="form-group">
					        		<input
					        			type="text"
					                 	placeholder='Username'
					                 	value={this.state.username}
					                 	className="form-control"
					                 	onChange={(text) => this.setState({ username: text })} />
					            </div>
					            <div className="form-group">
					              	<input
					              		type="password"
					                  	placeholder='Password'
					                  	value={this.state.password}
					                  	className="form-control"
					                  	onChange={(text) => this.setState({ password: text })} />
					            </div>

				              	<button
				                	onClick={ (e) => this.userLogin(e) }
				                	className="btn btn-dark" >
				                	SIGN IN
				              	</button>
				            </form>
				        </div>
				    </div>
	            </div>
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