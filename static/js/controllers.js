angular.module('myApp').controller('myCtrl', function($timeout,$rootScope,$scope,$http,$route,getDataService) {

    $scope.treeNodes =[{
    name: "Node 1",
        children: [{
            name: "Node 1.1",
            children:[
                {name:"Node 1.1.1"},
                {name: "Node 1.1.2"}]
        }]
    },{
        name: "Node 2",
        children: [
            {name: "Node 2.1"},
            {name: "Node 2.2"}
        ]
    }];


    $scope.options = {
        expandOnClick:true,
        showIcon: true,
        
    }



    

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
