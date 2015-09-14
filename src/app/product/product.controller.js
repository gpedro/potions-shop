/* global angular */
(function() {
  'use strict';

angular.module('cartExample.product')
  .controller('ProductCtrl', [
    '$rootScope',
    'Products',
    'Cart',
    ProductCtrl
  ]);

function ProductCtrl($rootScope, Products, Cart) {
  var vm = this;
  var products = Products.findAll() || [];
  vm.products = products;

  vm.toggleCart = function (id) {
    if (Cart.exists(id)) {
      Cart.remove(id);
    } else {
      Cart.add(id);
    }
  };

  $rootScope.$on('cartAdded', function () {
    products = Products.findAll() || [];
  });

  $rootScope.$on('cartRemoved', function () {
    products = Products.findAll() || [];
  });

  $rootScope.$on('cartReset', function () {
    products = Products.findAll() || [];
  });
}

}());
