/* global angular */
(function() {
  'use strict';

angular.module('cartExample.account')
  .controller('SignupCtrl', [
    'Accounts',
    '$scope',
    '$state',
    '$ionicPopup',
    SignupCtrl
  ]);

function SignupCtrl(Accounts, $scope, $state, $ionicPopup) {
  var vm = this;

  if (Accounts.isLogged()) {
    $state.go('tab.account');
  }

  vm.cadastrar = function (user) {
    Accounts.signup(user).then(function () {
      Accounts.login(user.login, user.password).then(function () {
        $state.go('tab.account');
      });
    }, function (msgs) {
      $ionicPopup.alert({
        title: 'Atenção',
        subTitle: msgs.join('<br>')
      });
    });
  };
}

}());
