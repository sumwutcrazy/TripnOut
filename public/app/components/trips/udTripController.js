tripnoutApp.controller('udTripController', function($rootScope, $scope, $state, $stateParams, Auth, User, Trip) {

	//get info if a person is logged in
  	$scope.loggedIn = Auth.isLoggedIn();

    //grab logged in user
    User.me().success(function(data){
      $scope.me = data;
    });

    $scope.dropClass = 'drop';

    $scope.trip_id = $stateParams.trip_id;

    $scope.countries = new Array("Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegowina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Cote d'Ivoire", "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France Metropolitan", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mc Donald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait", "Kyrgyzstan", "Lao, People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia, The Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia (Slovak Republic)", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbard and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zambia", "Zimbabwe", "Open Ocean", "Other");

    Trip.getTrip($stateParams.trip_id)
    .success(function(data) {
      $scope.trip = data;
      console.log($scope.trip);
    });

    $scope.thumb = true;
    $scope.newThumb = function(){
      if($scope.thumb){
        $scope.thumb = false;
      } else {
        $scope.thumb = true;
      }
    };

    $scope.addSection = function(type){

      var newContent = {
        datatype: type,
        content: ''
      };

      $scope.trip.content.push(newContent);
    }

    $scope.removeSection = function(index){

      if(index > -1){
        $scope.trip.content.splice(index, 1);
      }

    };

    $scope.displayButton = true;

    $scope.showOptions = function(){

      if($scope.displayButton){
        $scope.displayButton = false;
      } else {
        $scope.displayButton = true;
      }

    };

    $scope.publicMsg = "Yes, Share Publicly";

    $scope.onChange = function(setting){

      if(setting) {
        $scope.publicMsg = "Yes, Share Publicly";
      } else {
        $scope.publicMsg = "No, Share Privately";
      }

    }

    $scope.submitForm = function(isValid, trip){

      $scope.submitted = true;

      if(isValid) {
        $scope.updateTrip(trip, $scope.me._id);
      }

    };

    $scope.updateTrip = function(trip, me){
      console.log(trip);
      Trip.update(trip._id, me, trip).success(function(response){
        $scope.message = response;
        $state.go('my-trips', { msg: response.message});
      });
    };

    $scope.deleteTrip = function(){
      Trip.delete($scope.trip_id, $scope.me._id).success(function(response){
        $scope.message = response;
        $state.go('my-trips', { msg: response.message});
      });
    };

});