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

$http({
cache: false,
url: 'http://www.earchief.nl/microadmin/?obj=authentication&json=process&layout=login&au_then_ti_ca_tion=PostLogin',
method: "POST",
data: JSON.stringify($scope.data),
headers: {'Content-Type': 'application/x-www-form-urlencoded' }
}).
success(function (data){
  console.log(data);
}).
error(function () {
// if you are here something is not going so good
})
  }
})

.controller('ChatsCtrl', function($scope, Chats, $cordovaGeolocation) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
$scope.counter=1;
$scope.lat=0;
$scope.xlong=0;
$scope.loc=[];
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };

  var posOptions = {timeout: 10000, enableHighAccuracy: false};

  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      $scope.lat  = position.coords.latitude
      $scope.xlong = position.coords.longitude
      var p={"lat":$scope.lat,"long":$scope.xlong};
      $scope.loc.push(p);
    }, function(err) {
      // error
    });


  var watchOptions = {
    timeout : 3000,
    enableHighAccuracy: false // may cause errors if true
  };

  var watch = $cordovaGeolocation.watchPosition(watchOptions);
  watch.then(
    null,
    function(err) {
      // error
    },
    function(position) {
      $scope.lat  = position.coords.latitude
      $scope.xlong = position.coords.longitude
    var p={"lat":$scope.lat,"long":$scope.xlong};
      $scope.loc.push(p);
  });


  //watch.clearWatch();
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
