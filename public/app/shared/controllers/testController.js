
tripnoutApp.controller('testController', function($interval, $state, $location, Auth, User, Socket) {
  var vm = this;

  vm.members;

  Socket.on('users', function(users){
    vm.onlineList = users;
      for (var key in vm.members){
        var user = vm.members[key];
        if (vm.onlineList[user.username] !== undefined){
          vm.members[key].online = true;
        } else {
          vm.members[key].online = false;
        }
      };
  });

  //menu boolean
  vm.menu = false;

  vm.showMain = function(){
    vm.menu = false;
  }

  //get info if a person is logged in
  vm.loggedIn = Auth.isLoggedIn();

    //get logged in user info
    if(vm.loggedIn){
      User.me().success(function(data){
        vm.user = data;
        vm.user.online = true;
        onlineStatus(vm.user);
      });
      User.all().success(function(users){
        vm.members = users;
      });
    };

    
    

    //function to handle login form
    vm.doLogin = function() {
      vm.processing = true;

      //clear the error
      vm.error = '';

      //call the Auth.login() function
      Auth.login(vm.loginData.username, vm.loginData.password)
        .success(function(data)   {
          vm.processing = false;

          //if a user successfully logs in, redirect to users page
          if(data.success)
          {
            vm.loggedIn = Auth.isLoggedIn();
            User.me().success(function(data){
              vm.user = data;
              vm.user.online = true;
              onlineStatus(vm.user);
            });
            User.all().success(function(users){
              vm.members = users;
            });
            $state.go('profile');
          }
          else
            vm.error = data.message;
        });
        
    };

    //function to handle logging out
    vm.doLogout = function()  {
      Auth.logout();
      //reset all user info
      vm.user = {};
      onlineStatus(vm.user);
      vm.loggedIn = Auth.isLoggedIn();
      vm.showMain();
      $state.go('home');
    };

    var onlineStatus = function(user) {
      if(user.online == true){
        Socket.emit('online', { username: user.username });
      } else {
        Socket.emit('offline', { username: user.username });
      }
    }

});
