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

    $scope.load = function (){
        node = {};
        node.iri = $scope.rootContainer; 
        getDataService.getData(node).then(function(result) {
            $scope.treeNodes = [];
            $scope.treeNodes.push(result);
        }, function(){
            
        });
    }

    //on node change handler
    $scope.$on('selection-changed', function (e, node) {
        $scope.selectedNode = node;
        //if (node.fetch == 1) {return;}
        getDataService.getData(node).then(function(result) {
            updateNode($scope.selectedNode,result)
            
            $scope.selectedNode.fetch = 1;
        }, function(){
            
        });
        
    });

    $scope.$on('expanded-state-changed', function (e, node) {
        $scope.selectedNode = node;
        if(node.expanded){
            $scope.selectedNode.image = "static/lib/tree-widget/img/folder-open.png";
        } else {
            $scope.selectedNode.image = "static/lib/tree-widget/img/folder-closed.png";
        }
        
    });


    updateNode = function (oldObject,newObject){
        oldObject.children = newObject.children;
        oldObject.data = newObject.data;
        oldObject.type = newObject.type.join();
        console.log(oldObject.type);
    };

    	
});
