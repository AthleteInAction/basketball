// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require jquery.cookie
//= require jstz
//= require browser_timezone_rails/set_time_zone
//= require turbolinks
// require ./AngularJS/angular.js
//= require ./AngularJS/angular-1.3.15.js
//= require ./AngularJS/angular-resource.js
//= require ./AngularJS/angular-route.js
//= require ./AngularJS/angular-sanitize.js
//= require ./AngularJS/angular-uploader.js
//= require ./AngularJS/angular-number-picker.js
//= require ./AngularJS/angular-calendar.js
//= require ./AngularJS/angular-ui-bootstrap.js
//= require main
//= require_tree ./AngularHelpers
//= require_tree ./Utilities
//= require_tree ./AngularAPI
//= require_tree ./AngularCTRL/Application

$('document').ready(function(){

	var i = 0;
	$('.alert:not(.forever)').each(function(){

		var e = this;

		setTimeout(function(){

			$(e).slideUp();

		},4000);

		i++;

	});

});