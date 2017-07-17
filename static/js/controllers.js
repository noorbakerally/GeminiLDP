angular.module('myApp').controller('myCtrl', function($timeout,$rootScope,$scope,$http,$route,getDataService) {
    $scope.treeOptions = {
    nodeChildren: "children",
    dirSelectable: true,
    injectClasses: {
        ul: "a1",
        li: "a2",
        liSelected: "a7",
        iExpanded: "a3",
        iCollapsed: "a4",
        iLeaf: "a5",
        label: "a6",
        labelSelected: "a8"
    }
};
    $scope.dataForTheTree = [
    	{ "iri" : "http://localhost:8080/marmotta/ldp", "fetch" : 0, "children" : [] }
    ];

    

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
