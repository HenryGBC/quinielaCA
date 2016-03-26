'use strict';

(function() {

class MainController {
  //start-non-standard
  user = {};
  errors = {};
  submitted = false;
  //end-non-standard

  constructor($http, $scope, socket, Auth, $state) {
    this.$http = $http;
    this.socket = socket;
    this.Auth = Auth;
    this.awesomeThings = [];
    this.$state = $state;


    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  }

  $onInit() {
    /*this.$http.get('/api/things').then(response => {
      console.log(response);
      this.awesomeThings = response.data;
      this.socket.syncUpdates('thing', this.awesomeThings);
    });*/
  }

  register(form) {
    console.log(this.user);
    this.submitted = true;

    if (form.$valid) {
      this.Auth.createUser({
        name: this.user.name,
        email: this.user.email,
        password: this.user.password
      })
      .then(() => {
        // Account created, redirect to home
        this.$state.go('login');
      })
      .catch(err => {
        err = err.data;
        this.errors = {};

        // Update validity of form fields that match the mongoose errors
        angular.forEach(err.errors, (error, field) => {
          form[field].$setValidity('mongoose', false);
          this.errors[field] = error.message;
        });
      });
    }
  }

  addThing() {
    if (this.newThing) {
      this.$http.post('/api/things', { name: this.newThing });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete('/api/things/' + thing._id);
  }
}

angular.module('quinielaCaApp')
  .component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController
  });

})();
