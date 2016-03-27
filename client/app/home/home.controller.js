'use strict';
(function(){

class HomeComponent {
  constructor(User) {
    this.message = 'Hello';
    this.users = User.query();
    console.log(this.users);
  }
}

angular.module('quinielaCaApp')
  .component('home', {
    templateUrl: 'app/home/home.html',
    controller: HomeComponent
  });

})();
