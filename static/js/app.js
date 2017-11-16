var app = angular.module('myApp', ['ngRoute','ui.bootstrap','TreeWidget']);
app.run(function($rootScope) {
  $rootScope.loaded = true;
  document.getElementById("treeContainer").style.display="block";
});
