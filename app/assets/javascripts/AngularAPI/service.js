// GET CSRF-Token
// ======================================================================
// ======================================================================
var csrf;
App.config(['$httpProvider',function($httpProvider){
		$httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
		csrf = $('meta[name=csrf-token]').attr('content');
	}
]);
// ======================================================================
// ======================================================================


// API
// ======================================================================
// ======================================================================
angular.module('APIModule',['BlankModule'])
.service('API',['BlankSVC',function(BlankSVC){

	// INSERT HERE

}]);
// Placemarker
angular.module('BlankModule',[])
.service('BlankSVC',[function(){}]);
// ======================================================================
// ======================================================================