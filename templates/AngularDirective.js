(function() {
  'use strict';

  angular
    .module('<%= namespace %>')
    .directive('directive', directive);

  directive.$inject = ['$window'];

  function directive($window) {
    // Usage:
    //     <directive></directive>
    // Creates:
    //
    var directive = {
      link: link,
      restrict: 'EA'
    };
    return directive;

    function link(scope, element, attrs) {}
  }

})();
