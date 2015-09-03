angular.module('cartExample.controllers', [])

.controller('StoreCtrl', function($scope, Products, $localstorage) {
  var products = Products.all() || [];

  $scope.$on('$ionicView.beforeEnter', function() {
    var current = $localstorage.getArray('cart', []);
    products.map(function (item) {
      var filter = current.filter(function (cartItem) {
        return cartItem.id === item.id;
      });

      item.cart = !!filter.length;

      return item;
    });

    $scope.products = products;
  });

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

.controller('CheckoutCtrl', function($scope, $localstorage, $ionicPopup) {
  $scope.$on('$ionicView.beforeEnter', function() {
    $scope.products = $localstorage.getArray('cart', []);
  });

  var isLogged = ($localstorage.get('logged', 'false') == 'true');
  $scope.isLogged = isLogged;

  $scope.removeItem = function (id) {
    var current = $localstorage.getArray('cart', []);
    var filtered = current.filter(function (value) {
      return value.id != id;
    });

    $localstorage.setObject('cart', filtered);
    $scope.products = filtered;
  };

  $scope.getValorTotal = function () {
    var current = $localstorage.getArray('cart', []);
    var valorTotal = 0;
    current.forEach(function (value) {
      valorTotal += ((value.quantity || 1) * value.price);
    });

    return valorTotal;
  };

  $scope.limparCarrinho = function () {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Carrinho de Compras',
      template: 'Você tem certeza que deseja limpar o carrinho?',
      buttons: [
        { text: 'Cancelar' },
        { text: '<b>Limpar</b>',
        type: 'button-assertive',
        onTap: function(e) {
          $localstorage.setObject('cart', []);
          $scope.products = [];
        }
      }]
    });
  };

  $scope.finalizarPedido = function () {
    var current = $localstorage.getArray('cart', []);
    if (!current.length) {
      $ionicPopup.alert({
       title: 'Carrinho Vazio',
       template: 'Para finalizar o pedido é necessário possuir itens no carrinho.'
     });
      return;
    }

    var confirmPopup = $ionicPopup.confirm({
      title: 'Finalizar Pedido',
      template: 'Você já é nosso cliente? Faça login ou cadastre-se.',
      buttons: [
        { text: 'Entrar', type: 'button-positive',
          onTap: function(e) {

          }
        },
        { text: 'Cadastrar', type: 'button-balanced',
        onTap: function(e) {

        }
      }]
    });
  };
})

.controller('AccountCtrl', function($scope, $localstorage, $ionicPopup, $window, $timeout, $ionicLoading, Accounts) {

  var isLogged = ($localstorage.get('logged', 'false') == 'true');

  if (isLogged) {
    var account = $localstorage.getObject('session', {});
    if (account.hasOwnProperty('id')) {
      $scope.account = account;
    }
  }

  $scope.login = {};
  $scope.isLogged = isLogged;
  $scope.entrar = function () {
    var login = $ionicPopup.confirm({
      title: 'Entrar',
      subTitle: 'Digite seu usuário e senha',
      template: '<input type="text" ng-model="login.username" placeholder="Usuário" required/><br><input required placeholder="Senha" type="password" ng-model="login.password"/><br><p class="assertive" ng-bind="msgErr"></p>',
      scope: $scope,
      buttons: [
        { text: 'Cancelar', type: 'button-assertive' },
        { text: 'Entrar', type: 'button-balanced',
        onTap: function (e) {
          if (!$scope.login || !$scope.login.username || !$scope.login.password) {
            $scope.msgErr = 'Preencha todos os campos.';
            e.preventDefault();
            return;
          }

          e.preventDefault();
          $ionicLoading.show({
            template: 'Autenticando...'
          });

          $timeout(function() {
            $ionicLoading.hide();
            var authenticated = Accounts.auth($scope.login.username, $scope.login.password);
            if (authenticated) {
              $window.location.reload(true);
            } else {
              $scope.msgErr = 'Usuário ou senha inválidos';
            }

          }, 2000);
        }
      }]
    })
  };

  $scope.cadastrar = function () {

  };

  $scope.logout = function () {
    $ionicLoading.show({
      template: 'Saindo...'
    });

    $timeout(function() {
        $localstorage.setObject('session', {});
        $localstorage.set('logged', false);
        $window.location.reload(true);
    }, 1000);
  };
});
