angular.module('myApp').controller('myCtrl', function($timeout,$rootScope,$scope,$http,$route,getDataService,getDataService1) {
    
    
    //display the home page in the beginning
    $scope.home = true;
    $scope.showDetails = false;

    $scope.allowedContentType = ["application/json","text/turtle"]
    
    //do not show the loading gif in the beginning
    $scope.loading = false;

    $scope.isAllowedContentType = function (contenType) {
        if ($scope.allowedContentType.indexOf(contenType) != -1) {
            return true;
        }
        return false;
    };

    //initializing the tree
    $scope.treeNodes =[];
    $scope.options = {
        expandOnClick:true,
        showIcon: true,
    };

    $scope.setShowDetails = function (status){
        console.log("status changed");
        $scope.showDetails = status;
    };

    //show the home page
    $scope.showHome = function (){
        $scope.home = true;
        $scope.loading = false;
        $scope.configuration = false;
    };

    //show the configuration page
    $scope.showConfigurations = function (){
        $scope.home = false;
        $scope.loading = false;
        $scope.configuration = true;
    };

    //load function
    //responsible for loading ldprs
    $scope.load = function (iri){
        $scope.home = false;
        $scope.loading = false;
        $scope.configuration = false;
        
        node = {};
        if (iri){
            $scope.rootContainer = $scope.iri1;
        }
        node.iri = $scope.rootContainer;
        $scope.loading =true;
        console.log("test");
        getDataService.getData(node).then(function(result) {
            $scope.loading =false;
            $scope.treeNodes = [];
            $scope.treeNodes.push(result);
        }, function(){
            
        });
    }

    //on node change handler
    $scope.$on('selection-changed', function (e, node) {
        $scope.selectedNode = node;
        if (node.fetch == 1) {return;}
        $scope.loading = true;
        getDataService.getData(node).then(function(result) {
            $scope.loading = false;
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
    
        if (newObject.type.indexOf("Container") == -1){
            if (newObject.type.indexOf("RDFSource") != -1){
                oldObject.image = "static/lib/tree-widget/img/RDFSource.png";
            } else {
                oldObject.image = "static/lib/tree-widget/img/NonRDFSource.png";
            }
        }
        

        oldObject.type = newObject.type.join();
        oldObject.contentType = newObject.contentType;
    };

    
    //if there is an iri parameter in the URL
    //load it
    iri1 = window.location.search;
    iri1 = iri1.substring(1, iri1.length).replace("iri=","");
    if (iri1){
    	$scope.iri1 = iri1;
    	$scope.load(iri1); 
    }

});
