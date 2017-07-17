angular.module('myApp').controller('myCtrl', function($timeout,$rootScope,$scope,$http,$route,getDataService,getDataService1) {

    //initializing the tree
    $scope.treeNodes =[];
    $scope.options = {
        expandOnClick:true,
        showIcon: true,
    }

    
    //loading the initial node
    node = {};
    node.iri = "http://localhost:8080/marmotta/ldp"; 
    getDataService.getData(node).then(function(result) {
        $scope.treeNodes.push(result);
    }, function(){
        
    });
    $scope.test = "test";
    
    //on node change handler
    $scope.$on('selection-changed', function (e, node) {
        $scope.selectedNode = node;
        console.log(node.fetch);
        if (!node.fetch){
            getDataService.getData(node).then(function(result) {
                $scope.selectedNode.children = result.children;
                $scope.selectedNode.fetch = 1;
            }, function(){
                
            });
        }
    });



    	
});
