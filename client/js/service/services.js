'use strict';

angular
  .module('app')
  .service('ServiceService', ['Service', function(Service) {
    function find() {
      return Service.find();
    }

    function create(obj) {
      return Service.create(obj);
    }

    function deleteById(itemId) {
      return Service.deleteById({id: itemId});
    }

    return {
      create: create,
      find: find,
      deleteById: deleteById,
    };
  }]);