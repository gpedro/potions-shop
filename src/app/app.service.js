/* global angular */
(function() {
  'use strict';

angular.module('cartExample')
  .factory('$localstorage', [
    '$window',
    StorageService
  ]);

function StorageService($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    getArray: function(key) {
      return JSON.parse($window.localStorage[key]  || '[]');
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  };
}

}());
