'use strict';

angular
  .module('app', [
    'lbServices',
    'ui.router'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
      $urlRouterProvider) {
    $stateProvider
      .state('service', {
        url: '',
        templateUrl: 'js/service/templates/service.html',
        controller: 'ServiceCtrl'
      });
    $urlRouterProvider.otherwise('service');
  }]);
