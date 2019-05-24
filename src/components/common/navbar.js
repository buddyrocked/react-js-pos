import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../../actions';
import Auth from '../../services/auth';

class Navbar extends Component {
	
	constructor(props){
		super(props);
		this.state = {
		  	cart_count : 0,
		};
	}

	userLogout(e) {
		this.props.onLogout(() => {
			this.props.history.push('/');
		});
		e.preventDefault();
	}

	componentDidMount(){

	}

	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
				<Link className="navbar-brand" to="/">
					My App
				</Link>

				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor01">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item active">
							<Link className="nav-link" to="/">
								Home
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/intro">
								Intro
							</Link>
						</li>
						{
        					!Auth.isAuthenticated() &&
							<li className="nav-item">
								<Link className="nav-link" to="/login">
									Login
								</Link>
							</li>
						}
						{
        					Auth.isAuthenticated() &&
							<li className="nav-item">
								<Link className="nav-link" to="/profile">
									Profile
								</Link>
							</li>
						}
						{
        					Auth.isAuthenticated() &&
							<li className="nav-item">
								<a href="#" className="nav-link" onClick={ (e) => this.userLogout(e) }>
									Logout
								</a>
							</li>
						}
					</ul>
					<form className="form-inline my-2 my-lg-0">
						<input className="form-control mr-sm-2" type="text" placeholder="Search" />
						<button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
					</form>
                </div>
			</nav>
		);	
	};
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));