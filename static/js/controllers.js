angular.module('myApp').controller('myCtrl', function($scope,$http) {
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
    	{ "iri" : "Albert", "age" : "33", "children" : [] }
    ];

    $scope.showSelected= function (node){
        
    };
    $scope.onNodeToggled= function (node,expanded){
        console.log(node+" "+expanded);
        var promise = $http.jsonp("http://localhost:8080/marmotta/ldp");
    };
	
});
