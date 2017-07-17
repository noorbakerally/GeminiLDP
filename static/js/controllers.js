angular.module('myApp').controller('myCtrl', function($timeout,$rootScope,$scope,$http,$route,getDataService) {

    $scope.treeNodes =[];

    node = {};
    node.iri = "http://localhost:8080/marmotta/ldp"; 
    getDataService.getData(node).then(function(result) {
        $scope.treeNodes.push(result);
    }, function(){
        
    });

    $scope.options = {
        expandOnClick:true,
        showIcon: true,
    }

    $scope.$on('selection-changed', function (e, node) {
        
    });



    

    $scope.showSelected= function (node){
        $scope.node = node;
        getDataService.getData(node).then(function(result) {
            $scope.node.children = result.children;
        }, function(){
            
        });
    };

    $scope.onNodeToggled= function (node,expanded){
        
    };
	
});
