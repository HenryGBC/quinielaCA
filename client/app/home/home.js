'use strict';

angular.module('quinielaCaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        template: '<home></home>',
        authenticate: 'home'
      });
  });
