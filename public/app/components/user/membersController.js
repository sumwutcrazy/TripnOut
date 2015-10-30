tripnoutApp.controller('membersController', function($state, Auth){
	if(!Auth.isLoggedIn()){
		$state.go('login');
	}
})