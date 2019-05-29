import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaBoxOpen } from 'react-icons/fa';

import Auth from '../../services/auth';
import { logout } from '../../actions';


class Home extends Component {

	constructor(props) {
		super(props);
		this.state = {
			cart_count : 0,
		}
	}

	userLogout(e) {
		this.props.onLogout(() => {
			this.props.history.push('/login');
		});
		e.preventDefault();
	}

	componentDidMount(){
		console.log(Auth.isAuthenticated());
	}

	render() {
		if(Auth.isAuthenticated() || this.props.token !== ''){
			return (
				<div className="container">
					<div className="row">
						<div className="col-lg-4 col-lg-offset-4">
							<h1 className="center">HOMEPAGE</h1>
	    					<div className="well">
								<Link to="/profile" className="btn btn-primary btn-lg btn-block">Profile</Link>
								<a href="#"  className="btn btn-primary btn-lg btn-block" onClick={ (e) => this.userLogout(e) }>
									Logout
								</a>
							</div>						
						</div>
					</div>			
				</div>
			);
		}

		return (
			<div className="container">
				<div className="row">
					<div className="col-lg-4 col-lg-offset-4">
						<h1 className="center">HOMEPAGE</h1>
    					<div className="well">
    						<div className="alert alert-danger center">
    							Welcome To Point of Sales.
    						</div>
    						<div className="center">
    							<FaBoxOpen size="8em" color="#ff5c63" />
    						</div>
    						<div className="text-primary text-label center">
    							Already have an account? Please login.
    						</div>
    						<div>
								<Link to="/login" className="btn btn-primary btn-lg btn-block">Login</Link>
							</div>
						</div>						
					</div>
				</div>			
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

const mapDispatchToProps = (dispatch) => {
	return {
	    onLogout: (callback) => { dispatch(logout(callback)); },
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
