const Auth = {
	isAuthenticated(){
		var value = localStorage.getItem('token');
		if(value !== null){
			return true;
		} else {
			return false;
		}
	}	
}

export default Auth;
