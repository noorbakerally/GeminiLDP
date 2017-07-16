var app = angular.module('myApp', ['ngRoute','ui.bootstrap','treeControl']);
app.config(['$interpolateProvider', function($interpolateProvider) {
  $interpolateProvider.startSymbol('{a');
  $interpolateProvider.endSymbol('a}');
}]);
