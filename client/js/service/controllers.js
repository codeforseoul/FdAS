'use strict';

angular
  .module('app')
  .controller('ServiceCtrl', ['$scope', '$state', 'ServiceService', function($scope,
      $state, ServiceService) {
    console.log(ServiceService);
    $scope.Services = [];
    function getServices() {
      ServiceService
        .find()
        .$promise
        .then(function(results) {
          $scope.Services = results;
        });
    }
    getServices();

    $scope.addService = function() {
      ServiceService
        .create($scope.newService)
        .$promise
        .then(function(Service) {
          $scope.newService = '';
          $scope.serviceForm.content.$setPristine();
          $('.focus').focus(); //JQuery hack for refocusing text input
          getServices();
        });
    };

    $scope.removeService = function(item) {
      ServiceService
        .deleteById(item.id)
        .$promise
        .then(function() {
          getServices();
        });
    };
  }]);