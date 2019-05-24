import React from 'react';
import {Route} from 'react-router-dom';

import Auth from '../services/auth';
import Sidebar from '../components/common/sidebar';
import NotAuthorized from '../components/auth/NotAuthorized';

function UnsecuredRoute(props) {
	const {component: Component, path, withSidebar} = props;
	return (
		<Route path={path} render={() => {
		    return (
		    	<>
		    		{
		    			Auth.isAuthenticated() && withSidebar &&
		    				<Sidebar />
		    		}
                	<div id="content">
		    			<Component />
		    		</div>
		    	</>
		    );
		}} />
	);
}

export default UnsecuredRoute;

