/* global angular */
(function() {
  'use strict';

angular.module('cartExample.cart')
  .factory('Cart', [
    '$localstorage',
    '$rootScope',
    'Products',
    'SweetAlert',
    CartService
  ]);

function CartService($localstorage, $rootScope, Products, SweetAlert) {

  function all() {
    return $localstorage.getArray('cart', []);
  }

  function add(id) {
    var cart = $localstorage.getArray('cart', []);
    var search = cart.filter(function (value) {
      return value.id === id;
    });

    var already = !!search.length;
    if (already) {
      return;
    } else {
      var product = Products.findOne(id);
      if (product) {
        cart.push(product);
        $localstorage.setObject('cart', cart);
        $rootScope.$emit('cartAdded', product);
        SweetAlert.swal({
          title: '',
          text: product.name + ' foi adicionado ao carrinho',
          type: 'success'
        });
      }
    }
  }

  function remove(id) {
    var cart = $localstorage.getArray('cart', []);
    var search = cart.filter(function (value) {
      return value.id !== id;
    });
    var product = Products.findOne(id);

    $localstorage.setObject('cart', search);
    $rootScope.$emit('cartRemoved', id);
    SweetAlert.swal({
      title: '',
      text: product.name + ' foi removido do carrinho',
      type: 'success'
    });
  }

  function reset() {
    SweetAlert.swal({
      title: 'Você tem certeza?',
      text: 'Ao continuar, o carrinho será limpo e esta ação será irreversível!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Limpar!',
      closeOnConfirm: false
    }, function () {
      SweetAlert.swal({
      title: 'Sucesso',
      text: 'Seu carrinho foi limpo!',
      type: 'success'
      });

      $localstorage.setObject('cart', []);
      $rootScope.$emit('cartReset');
    });
  }

  function exists(id) {
    var cart = $localstorage.getArray('cart', []);

    var search = cart.filter(function (value) {
      return value.id === id;
    });

    return !!search.length;
  }

  return {
    all: all,
    add: add,
    remove: remove,
    reset: reset,
    exists: exists
  };
}

}());
