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
    name: 'Gabriel Pedro',
    login: 'gpedro',
    email: 'gpedro831@gmail.com',
    password: 'jusolu'
  }, {
    id: 1,
    name: 'Rayssa Monteiro',
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
    var deferred = $q.defer();
    var msg = [];
    if (!user.nome) {
      msg.push('Campo nome deve ser preenchido.');
    }

    if (!user.login) {
      msg.push('Campo login deve ser preenchido.');
    } else {
      var isUnique = exists('login', user.login);
      if (!isUnique) {
        msg.push('Usuário já cadastrado.');
      }
    }

    if (!user.email) {
      msg.push('Campo email deve ser preenchido.');
    } else {
      var isUnique = exists('email', user.email);
      if (!isUnique) {
        msg.push('Email já cadastrado.');
      }
    }

    if (!user.password) {
      msg.push('Campo senha deve ser preenchido.');
    }

    if (!msg.length) {
      user.id = db.length + 1;
      db.push(user);
      deferred.resolve('Cadastro realizado com sucesso.');
    } else {
      deferred.reject(msg);
    }

    $ionicLoading.show({
      template: 'Carregando...'
    });

    $timeout(function () {
      $ionicLoading.hide();
    }, 2000);

    return deferred.promise;
  }

  function login (username, password) {
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

    $ionicLoading.show({
      template: 'Carregando...'
    });

    $timeout(function () {
      $ionicLoading.hide();
    }, 2000);

    var logged = !!count;

    if (logged) {
      $rootScope.$emit('userLogged');
    }

    return logged;
  }

  function logout() {
    $rootScope.$emit('userLogout');

    $ionicLoading.show({
      template: 'Carregando...'
    });

    $timeout(function () {
      $localstorage.setObject('session', {});
      $localstorage.set('logged', false);
      $ionicLoading.hide();
    }, 2000);
  }

  function isLogged() {
    return $localstorage.get('logged', 'false') === 'true';
  }

  return {
    signup: signup,
    login: login,
    logout: logout,
    isLogged: isLogged
  };
}

}());
