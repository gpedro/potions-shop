/* global angular */
(function() {
  'use strict';

angular.module('cartExample.product')
  .controller('ProductDetailCtrl', [
    '$rootScope',
    '$stateParams',
    'Products',
    'Cart',
    'SweetAlert',
    ProductDetailCtrl
  ]);

function ProductDetailCtrl($rootScope, $stateParams, Products, Cart) {
  var vm = this;
  var id = $stateParams.id;
  var product = Products.findOne(id);

  vm.product = product;

  vm.toggleCart = function (id) {
    if (Cart.exists(id)) {
      Cart.remove(id);
    } else {
      Cart.add(id);
    }
  };

  $rootScope.$on('cartAdded', function () {
    product = Products.findOne(id);
  });

  $rootScope.$on('cartRemoved', function () {
    product = Products.findOne(id);
  });

  $rootScope.$on('cartReset', function () {
    product = Products.findOne(id);
  });
}

}());
