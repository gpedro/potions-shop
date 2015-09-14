/* global angular */
(function() {
  'use strict';

angular.module('cartExample.cart')
  .controller('CheckoutCtrl', [
    '$rootScope',
    'Cart',
    CheckoutCtrl
  ]);

function CheckoutCtrl($rootScope, Cart) {
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
