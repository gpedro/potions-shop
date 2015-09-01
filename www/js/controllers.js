angular.module('cartExample.controllers', [])

.controller('StoreCtrl', function($scope, Products, $localstorage) {
  var products = Products.all() || [];
  var current = $localstorage.getArray('cart', []);
  products.map(function (item) {
    var filter = current.filter(function (cartItem) {
      return cartItem.id === item.id;
    });

    item.cart = !!filter.length;

    return item;
  });

  $scope.products = products;

  $scope.cartExists = function (id) {
    var filter = current.filter(function (value) {
      return value.id === id;
    });

    return filter.length;
  };

  $scope.toggleCart = function (product) {
    var current = $localstorage.getArray('cart', []);
    var filter = current.filter(function (value) {
      return value.id === product.id;
    });

    if (filter.length) {
      product.cart = false;
      var filtered = current.filter(function (value) {
        return value.id != product.id;
      });
      $localstorage.setObject('cart', filtered);
    } else {
      product.cart = true;
      current.push(product);
      $localstorage.setObject('cart', current);
    }
  };

})

.controller('ProductDetailCtrl', function($scope, $stateParams, Products, $localstorage) {
  var cart     = $localstorage.getArray('cart', []);
  var product  = Products.get($stateParams.productId);

  cart.map(function (value) {
    if (product.id === value.id) {
      product.cart = true;
    }
  });

  $scope.product = product;

  $scope.toggleCart = function (potion) {
    var current = $localstorage.getArray('cart', []);
    var filter = current.filter(function (value) {
      return value.id === potion.id;
    });

    if (filter.length) {
      potion.cart = false;
      var filtered = current.filter(function (value) {
        return value.id != potion.id;
      });
      $localstorage.setObject('cart', filtered);
    } else {
      potion.cart = true;
      current.push(potion);
      $localstorage.setObject('cart', current);
    }
  };
})

.controller('CheckoutCtrl', function($scope) {

})

.controller('AccountCtrl', function($scope) {

});
