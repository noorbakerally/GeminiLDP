angular.module('myApp').factory('getDataService', ['$q','$http', function($q,$http) {
    return {
        getData: function (node) {
            var deferred = $q.defer();
            var url = "http://127.0.0.1:5000/getResource?ldpr="+node.iri;
            $http.get(url).then(function(response) {deferred.resolve(response.data);});
            return deferred.promise;
        }
    };
}]);