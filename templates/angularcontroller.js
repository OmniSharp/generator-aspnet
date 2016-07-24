(function() {
  'use strict';

  angular
    .module('<%= namespace %>')
    .controller('controller1', controller1);

  controller1.$inject = ['$scope'];

  function controller1($scope) {
    $scope.title = 'controller1';

    activate();

    function activate() {}
  }
})();
