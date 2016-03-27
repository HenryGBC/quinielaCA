'use strict';

angular.module('quinielaCaApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        template: '<main></main>',
        resolve: {
          isAuthenticated: isAuthenticated
        }
      });


      isAuthenticated.$inject = ['$q', 'Auth', '$state'];
      function isAuthenticated($q, Auth, $state){
        Auth.isLoggedIn(_.noop).then(is =>{
            if(is){
              Auth.hasRole('admin', _.noop).then(has => {
                if(has){
                  console.log('state admin');
                  $state.go('admin');
                }else{
                  console.log('state /home');
                  $state.go('home');
                }
                //$state.go(has ? 'admin' : 'main');  //later home
              });
            }else{
              console.log(is);
            }

        });
      }
  });
