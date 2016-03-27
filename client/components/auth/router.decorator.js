'use strict';

(function() {

angular.module('quinielaCaApp.auth')
  .run(function($rootScope, $state, Auth) {
    // Redirect to login if route requires auth and the user is not logged in, or doesn't have required role
    $rootScope.$on('$stateChangeStart', function(event, next) {

      if (!next.authenticate) {
        return;
      }

      if (typeof next.authenticate === 'string') {
        console.log(next);
        Auth.hasRole(next.authenticate, _.noop).then(has => {
          if (has) {
            return;
          }
          event.preventDefault();
          return Auth.isLoggedIn(_.noop).then(is => {
            console.log(next);
            $state.go(is ? 'main' : 'login');
          });
        });
      } else {
        Auth.isLoggedIn(_.noop).then(is => {
          if (is) {
            return;
          }
          console.log(next);
          event.preventDefault();
          $state.go('main');
        });
      }
    });
  });

})();
