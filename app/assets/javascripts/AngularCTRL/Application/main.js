App.config(['$routeProvider',function($routeProvider){

	// html5Mode: true;

	$routeProvider
	/* MARKER */  	
	.when('/my-stuff',{

		templateUrl : '/angularjs/templates/mystuff.html',
		controller: MystuffCtrl

	})

	.otherwise({
		
		redirectTo: '/my-stuff'

	});
	
}]);