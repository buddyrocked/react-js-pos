import React from 'react';
import {Route} from 'react-router-dom';
import Auth from '../services/auth';
import Navbar from '../components/common/navbar';

function SecuredRoute(props) {
	const {component: Component, path} = props;
	return (
		<Route path={path} render={() => {
			console.log(Auth.isAuthenticated());
		    if (!Auth.isAuthenticated()) {		      	
	      		return (
	      			<div>
	      				<Navbar />
	      				Login Please!
	      			</div>
	      		);		      	
		    }
		    return <Component />
		}} />
	);
}

export default SecuredRoute;

