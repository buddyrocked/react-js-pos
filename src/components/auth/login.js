import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FaUnlockAlt } from 'react-icons/fa';

import { login } from '../../actions';
import Message from '../common/message';
import LoaderComponent from '../common/loader';

class Login extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
			messageDisplay 	: 'none',
			messageText 	: '',
			route    		: 'Login',
			username 		: 'superadmin',
			password 		: 'superadmin',
			loading  		: false
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
		  	setTimeout(
		  		() => {
		  			this.setState({
				    	messageDisplay 	: 'block',
						messageText 	: 'login success.',
						loading			: false
				  	});
		  			this.props.history.push('/profile');
		  		},
		  		3000
		  	);
		},() => {
		  	setTimeout(
		  		() => {
		  			this.setState({
				    	messageDisplay 	: 'block',
						messageText 	: 'login failed.',
						loading			: false
				  	});
		  		},
		  		3000
		  	);
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
    	return (
      		<>
      			{ 
      				this.state.loading &&
      				<LoaderComponent loading="true" />
      			}
      			<div className="container">
					<div className="row">
						<div className="col-lg-4 col-lg-offset-4">
							<h2 className="center">LOGIN PAGE</h2>
							<div className="well">
								<div className="text-label center">
	    							<FaUnlockAlt size="8em" color="#ff5c63" />
	    						</div>
	      						<Message display={this.state.messageDisplay} text={this.state.messageText} />
				        		<form>
				        			<div className="form-group">
						        		<input
						        			type="text"
						                 	placeholder='Username'
						                 	className="form-control"
						                 	value={this.state.username}
						                 	onChange={event => this.setState({ username: event.target.value })} />							                 	
						            </div>
						            <div className="form-group">
						              	<input
						              		type="password"
						                  	placeholder='Password'
						                  	className="form-control"
						                 	value={this.state.password}
						                  	onChange={event => this.setState({ password: event.target.value })} />
						            </div>
						            <div className="text-primary text-label center">
		    							&nbsp;
		    						</div>
					              	<button
					                	onClick={ (e) => this.userLogin(e) }
					                	className="btn btn-primary btn-block btn-lg" >
					                	SIGN IN
					              	</button>
					            </form>
					        </div>
				        </div>
				    </div>
	            </div>
      		</>
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
		onLogin: (values, callback, callback2) => { dispatch(login(values, callback, callback2)) },
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);