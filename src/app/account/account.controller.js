/* global angular */
(function() {
  'use strict';

angular.module('cartExample.account')
  .controller('AccountCtrl', [
    '$rootScope',
    '$state',
    'Accounts',
    AccountCtrl
  ]);

function AccountCtrl($rootScope, $state, Accounts) {
  var vm = this;

  vm.isLogged = Accounts.isLogged();
  vm.session = Accounts.user();

  vm.logout = function () {
    Accounts.logout();
  };

  vm.entrar = function () {
    $state.go('tab.login');
  };

  vm.cadastrar = function () {
    $state.go('tab.signup');
  };

  $rootScope.$on('login', function () {
    vm.isLogged = Accounts.isLogged();
    vm.session = Accounts.user();
  });

  $rootScope.$on('logout', function () {
    vm.isLogged = Accounts.isLogged();
    vm.session  = Accounts.user();
  });
}

}());
