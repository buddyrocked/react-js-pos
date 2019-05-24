import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';


class NotAuthorized extends Component {

	constructor(props) {
		super(props);
		this.state = {
			cart_count : 0,
		}
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-lg-4 col-lg-offset-4">
						<h1 className="center">FORBIDEN</h1>
    					<div className="well">
    						<div className="alert alert-danger center">
    							You are not authorized, please login to access this page.
    						</div>
    						<div className="center">
    							<FaExclamationTriangle size="8em" color="#ff5c63" />
    						</div>
    						<div className="text-primary text-label center">
    							&nbsp;
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
		
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
	    
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NotAuthorized);
