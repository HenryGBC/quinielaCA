'use strict';

angular.module('quinielaCaApp.auth', [
  'quinielaCaApp.constants',
  'quinielaCaApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
