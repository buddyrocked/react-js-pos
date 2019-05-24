import React from 'react';
import {Route} from 'react-router-dom';
import { Link } from 'react-router-dom';

import Auth from '../services/auth';
import Sidebar from '../components/common/sidebar';
import NotAuthorized from '../components/auth/NotAuthorized';

function SecuredRoute(props) {
	const {component: Component, path, withSidebar} = props;
	return (
		<Route path={path} render={() => {
			console.log(Auth.isAuthenticated());
		    if (!Auth.isAuthenticated()) {		      	
	      		return (
					<>
						<NotAuthorized />
					</>
				);		      	
		    } else {
			    return (
			    	<>
			    		{
			    			withSidebar &&
			    				<Sidebar />
			    		}
	                	<div id="content">
			    			<Component />
			    		</div>
			    	</>
			    );
			}
		}} />
	);
}

export default SecuredRoute;

