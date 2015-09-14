/* global angular */
(function() {
  'use strict';

angular.module('cartExample.cart')
  .controller('CheckoutCtrl', [
    '$rootScope',
    '$ionicPopup',
    '$state',
    'Cart',
    'Accounts',
    CheckoutCtrl
  ]);

function CheckoutCtrl($rootScope, $ionicPopup, $state, Cart, Accounts) {
  var vm = this;
  var products = Cart.all();
  vm.products = products;

  vm.getValorTotal = function () {
    var carrinho = Cart.all();
    var valorTotal = 0;
    carrinho.forEach(function (potion) {
      valorTotal += ((potion.quantity || 1) * potion.price);
    });

    return valorTotal;
  };

  vm.limparCarrinho = function () {
    Cart.reset();
  };

  vm.finalizarPedido = function () {
    if (Accounts.isLogged()) {
      //
    } else {
      $ionicPopup.alert({
        title: 'Autenticação necessária',
        subTitle: 'Para continuar é necessário estar logado'
      });
      $state.go('tab.login');
    }
  };

  $rootScope.$on('cartAdded', function () {
    vm.products = Cart.all();
  });

  $rootScope.$on('cartRemoved', function () {
    vm.products = Cart.all();
  });

  $rootScope.$on('cartReset', function () {
    vm.products = Cart.all();
  });
}

}());
