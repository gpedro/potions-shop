/* global angular, cordova, StatusBar */
(function() {
  'use strict';

angular.module('cartExample')
  .run([
    '$ionicPlatform',
    AppRun
  ])
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    AppConfig
  ]);

function AppRun($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
}

function AppConfig($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'app/app.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.store', {
    url: '/store',
    views: {
      'tab-store': {
        templateUrl: 'app/product/product.html',
        controller: 'ProductController as vm'
      }
    }
  })

  .state('tab.product', {
    url: '/store/:productId',
    views: {
      'tab-store': {
        templateUrl: 'app/product/details.html',
        controller: 'ProductDetailCtrl as vm'
      }
    }
  })

  .state('tab.checkout', {
    url: '/checkout',
    views: {
      'tab-checkout': {
        templateUrl: 'app/cart/checkout.html',
        controller: 'CheckoutCtrl as vm'
      }
    }
  })
/*
  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl',
        controllerAs: 'vm'
      }
    }
  })

  .state('tab.signup', {
    url: '/signup',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-signup.html',
        controller: 'SignupCtrl',
        controllerAs: 'vm'
      }
    }
  })*/;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/store');

}

}());
