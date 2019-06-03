import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FaBeer, FaCreditCard, FaBoxOpen, FaChartLine, FaPowerOff } from 'react-icons/fa';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { logout } from '../../actions';
import Auth from '../../services/auth';

const MySwal = withReactContent(Swal)

class Sidebar extends Component {
	
	constructor(props){
		super(props);
		this.state = {
		  	cart_count : 0,
		  	show : false
		};
	}

	handleLogout(e){
		this.showAlert();
		e.preventDefault();
	}

	showAlert(){
		MySwal.fire({
			title: <p>Logout</p>,
			text: 'Are you sure?',
        	type: 'warning',
			footer: '',
			showCancelButton : true,
			showCloseButton: true,
			confirmButtonClass: 'btn btn-primary'
		}).then((result) => {
			if (result.value){
				this.userLogout();
			}
		});
	}

	userLogout() {
		this.props.onLogout(() => {
			this.props.history.push('/login');
			MySwal.fire({
				text: 'you are logout',
	        	type: 'success',
				position: 'bottom-end',
		        showConfirmButton: false,
		        toast: true,
		        timer: 300000 
			});
		});
	}	

	componentDidMount(){

	}

	render() {
		return (
			<>
			<nav id="sidebar" className="active">
		        <div className="sidebar-header">
		            <h3>Bootstrap Sidebar</h3>
		            <strong>DP</strong>
		        </div>
		        <ul className="list-unstyled components sidebar-menu">
		        	<li>
		        		<Link to="/products">
		        			<FaBeer size="1.8em" color="#ff5c63" style={iconStyle}/>
		        			Cashier
		        		</Link>
		        	</li>
		        	<li>
		        		<Link to="/profile">
		        			<FaCreditCard size="1.8em" color="#ff5c63" style={iconStyle} />
		        			Profile
		        		</Link>
		        	</li>
					<li>
						<Link to="#product-menu" data-toggle="collapse" aria-expanded="false"><FaBoxOpen size="1.8em" color="#ff5c63" style={iconStyle} />Product</Link>
						<ul className="collapse list-unstyled" id="product-menu">
							{
		    					!Auth.isAuthenticated() &&
								<li><Link to="/login">Login</Link></li>
							}
							<li><Link to="/intro">Intro</Link></li>
						</ul>
					</li>
					<li>
						<Link to="#report-menu" data-toggle="collapse" aria-expanded="false" className="collapsed"><FaChartLine size="1.8em" color="#ff5c63" style={iconStyle} />Report</Link>
						<ul className="list-unstyled collapse" id="report-menu" aria-expanded="false">
							<li><Link to="/report-stock"><i className="fa fa-"></i>Stock</Link></li>
							<li><Link to="/report-index"><i className="fa fa-"></i>Order</Link></li>
							<li><Link to="/report-detail"><i className="fa fa-"></i>Detail</Link></li>
							<li><Link to="/report-daily"><i className="fa fa-"></i>Daily</Link></li>
						</ul>
					</li>
					{
        					Auth.isAuthenticated() &&
							<li>
								<a href="#" onClick={ (e) => this.handleLogout(e) }>
									<FaPowerOff size="1.8em" color="#ff5c63" style={iconStyle}/>
									Logout
								</a>
							</li>
					}
				</ul>
			</nav>
			</>
		);	
	};
}

const iconStyle = {
	display: 'block',
	marginRight: 'auto',
	marginLeft: 'auto',
	marginBottom: '5px',
};

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar));