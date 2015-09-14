/* global angular */
(function() {
  'use strict';

angular.module('cartExample.account')
  .controller('LoginCtrl', [
    'Accounts',
    '$state',
    '$ionicPopup',
    LoginCtrl
  ]);

function LoginCtrl(Accounts, $state, $ionicPopup) {
  var vm = this;

  if (Accounts.isLogged()) {
    $state.go('tab.account');
  }

  vm.entrar = function (user) {
    var login = user.usuario;
    var senha = user.senha;

    var auth = Accounts.login(login, senha);
    auth.then(function () {
      $state.go('tab.account');
    }, function (err) {
      $ionicPopup.alert({
        title: err
      });
    });
  };
}

}());
