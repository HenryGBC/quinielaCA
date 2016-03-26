'use strict';


angular.module('quinielaCaApp')
  .directive('navbar', function($rootScope, $state, Auth) {
    return {
      templateUrl: 'components/navbar/navbar.html',
      restrict: 'E',
      controller: 'NavbarController',
      controllerAs: 'nav',
      link: function(scope, element) {
           var stateName = $state.current.name;
           var user = Auth.getCurrentUser();
           console.log(Auth.isLoggedIn());
           scope.isLanding=(stateName === 'main' || stateName === 'login' );
           $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
                stateName = toState.name;
                console.log(stateName);
                scope.isLanding=(stateName === 'main' || stateName === 'login');

          });
      }
    };
  });
