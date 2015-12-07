var App = angular.module('App',['APIModule','ngRoute','ngResource','ngSanitize','ui.bootstrap','angularFileUpload','angularNumberPicker','ui.calendar']);
App.value('$anchorScroll',angular.noop);
$(document).on('ready page:load', function(arguments) {
  angular.bootstrap(document.body, ['App'])
});

App.run(function(){

  var tag = document.createElement('script');
  tag.src = "http://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

});