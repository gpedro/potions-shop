/* global angular */
(function() {
  'use strict';

angular.module('cartExample.account')
  .factory('Accounts', [
    '$localstorage',
    '$ionicLoading',
    '$timeout',
    '$rootScope',
    '$q',
    AccountService
  ]);

function AccountService($localstorage, $ionicLoading, $timeout, $rootScope, $q) {
  // static db
  var db = [{
    id: 0,
    nome: 'Gabriel Pedro',
    login: 'gpedro',
    email: 'gpedro831@gmail.com',
    password: 'jusolu'
  }, {
    id: 1,
    nome: 'Rayssa Monteiro',
    login: 'rayssa',
    email: 'rayssamonteiro92@gmail.com',
    password: '666'
  }];

  function exists (column, value) {
    var accs = db.filter(function (obj) {
      return obj[column] === value;
    });

    return !!accs.length;
  }

  function signup (user) {
    $ionicLoading.show({
      template: 'Carregando...'
    });

    var deferred = $q.defer();
    var msg = [];
    if (!user.nome) {
      msg.push('Campo nome deve ser preenchido.');
    }

    if (!user.login) {
      msg.push('Campo login deve ser preenchido.');
    } else {
      var isUniqueLogin = !exists('login', user.login);
      if (!isUniqueLogin) {
        msg.push('Usuário já está sendo utilizado.');
      }
    }

    if (!user.email) {
      msg.push('Campo email deve ser preenchido.');
    } else {
      var isUniqueEmail = !exists('email', user.email);
      if (!isUniqueEmail) {
        msg.push('Email já está sendo utilizado.');
      }
    }

    if (!user.password) {
      msg.push('Campo senha deve ser preenchido.');
    }

    $timeout(function () {
      $ionicLoading.hide();

      if (!msg.length) {
        user.id = db.length + 1;
        db.push(user);
        deferred.resolve('Cadastro realizado com sucesso.');
      } else {
        deferred.reject(msg);
      }
    }, 2000);

    return deferred.promise;
  }

  function login (username, password) {
    $ionicLoading.show({
      template: 'Carregando...'
    });
    var deferred = $q.defer();
    var result = db.filter(function (value) {
      return value.login == username && value.password == password;
    });

    var count = result.length;
    if (count) {
      var acc = result[0];
      delete acc.password;
      $localstorage.setObject('session', acc);
      $localstorage.set('logged', true);
    }

    var logged = !!count;

    $timeout(function () {
      $ionicLoading.hide();
      if (logged) {
        $rootScope.$emit('login');
        deferred.resolve();
      } else {
        deferred.reject('Usuário ou senha inválidos.');
      }
    }, 1000);

    return deferred.promise;
  }

  function logout() {

    $ionicLoading.show({
      template: 'Carregando...'
    });

    $timeout(function () {
      $localstorage.setObject('session', {});
      $localstorage.set('logged', false);
      $ionicLoading.hide();
      $rootScope.$emit('logout');
    }, 2000);
  }

  function isLogged() {
    return $localstorage.get('logged', 'false') === 'true';
  }

  function currentUser() {
    if (isLogged()) {
      return $localstorage.getObject('session');
    }
  }

  return {
    signup: signup,
    login: login,
    logout: logout,
    isLogged: isLogged,
    user: currentUser
  };
}

}());
