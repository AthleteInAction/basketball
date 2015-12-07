// angular.controller('MystuffCtrl',['$scope','$routeParams','$location','$timeout','$interval','API',
// 	function($scope,$routeParams,$location,$timeout,$interval,API){

// 		var scope = $scope;

// 		scope.params = $routeParams;

// 		JP('MYSTUFF');

// 	}
// ]);
var MystuffCtrl = ['$scope','$routeParams',function($scope,$routeParams){

	var scope = $scope;

	scope.params = $routeParams;

	JP('MYSTUFF');

}];