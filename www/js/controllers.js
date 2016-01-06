angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope,$http) {
  $scope.login = {};

  $scope.loginAuthorization = function()
  { 
      var crp = md5($scope.login.username+$scope.login.password);
      $scope.data ={"email":$scope.login.username,"myhash":crp};
      console.log(JSON.stringify($scope.data));

/*        $http.post("http://www.earchief.nl/microadmin/?obj=authentication&json=process&layout=login&au_then_ti_ca_tion=PostLogin").success(function(data, status) {
            $scope.hello = data;
            console.log(data);
        })*/
  }
})

.controller('ContactList', function($scope, myservice, $cordovaGeolocation) 
{
        var posOptions = {timeout: 10000, enableHighAccuracy: false};
      $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
        var lat  = position.coords.latitude
        var long = position.coords.longitude
        console.log(lat);
      }, function(err) 
      {
      });
      
  $scope.UserLocation = function()
  {
      var posOptions = {timeout: 10000, enableHighAccuracy: false};
      $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
        var lat  = position.coords.latitude
        var long = position.coords.longitude
        console.log(lat);
      }, function(err) 
      {
      });
  }

  setInterval(function()
  {
     $scope.UserLocation();
  }, 600000);
})

.controller('ContactDetails', function($scope, $stateParams, myservice)
 {
  $scope.chat = myservice.get($stateParams.chatId);
});

