App.directive('editPost',function($window,$rootScope,$interval){

   return {
      restrict: 'E',
      // scope: {
      //    systems: '=post'
      // },
      templateUrl: '/angularjs/templates/edit_post.html',
      controller: function ($scope){

         var scope = $scope;

         scope.getSeconds = function(t){

            var Final = (t.h*60*60) + (t.m*60) + t.s;

            return Final;

         }

         scope.player;
         scope.youtube_ready = false;

         scope.regex = {
            youtube: /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/
         }

         scope.getCategories = function(){

            var Categories = Parse.Object.extend('Categories');
            var query = new Parse.Query(Categories);
            query.find({
              success: function(results) {
                
                scope.categories = results.map(function(item){

                  return new Category(item);

                });

              },
              error: function(error) {

                JP("Error: " + error.code + " " + error.message);

              }
            });

         };
         scope.getCategories();

         scope.getSections = function(category){

            JP('Get Sections');

            scope.sections = [];

            var Sections = Parse.Object.extend('Sections');
            var query = new Parse.Query(Sections);
            query.equalTo('category',category.object);
            query.find({
              success: function(results) {
                
                scope.sections = results.map(function(item){

                  return new Section(item);

                });

              },
              error: function(error) {

                JP("Error: " + error.code + " " + error.message);

              }
            });

         };

         scope.loop = function(){

            if (scope.post && scope.post.player){

               if (scope.post.sound){

                  scope.post.player.unMute();

               } else {

                  scope.post.player.mute();

               }

               if (scope.post.loop && scope.post.player.B.playerState == 1){

                  if (scope.post.player.getCurrentTime() < scope.post.start_time){

                     scope.post.player.seekTo(scope.post.start_time,true);

                  }

                  if (scope.post.player.getCurrentTime() > (scope.post.start_time+scope.post.loop_duration)){

                     scope.post.player.seekTo(scope.post.start_time,true);

                  }

               }

            }

         }

         scope.urlCHG = function(){

            if (scope.url){

               if (!scope.post){

                  scope.post = {
                     loop: false,
                     sound: true,
                     start_time: 0,
                     loop_duration: 10,
                     resource: {
                        url: angular.copy(scope.url)
                     },
                     getKey: function(){

                        if (scope.regex.youtube.test(this.resource.url)){

                           this.resource.key = 'youtube';

                        } else {

                           this.resource.key = null

                        }

                     },
                     loopCHG: function(){

                        if (this.loop){

                           this.start_time = this.player.getCurrentTime();
                           this.loop_duration = 10;

                        }

                     }
                  }

               }

               scope.post.resource.url = angular.copy(scope.url);

               scope.post.getKey()

            } else {

               scope.post = null;

            }

         }

         scope.urlCHG();

         scope.savePost = function(post){

          var Post = Parse.Object.extend('Posts');
          var _post = new Post();
          var Resource = Parse.Object.extend('Resources');
          var _resource = new Resource();

          _resource.set('url',post.resource.url);
          _resource.set('key',post.resource.key);

          _post.set('title',post.title);
          _post.set('resource',_resource);
          _post.set('category',post.category.object);
          _post.set('section',post.section.object);
          _post.set('start_time',post.start_time);
          _post.set('loop_duration',post.loop_duration);
          _post.set('loop',post.loop);
          _post.set('sound',post.sound);

          _post.save(null,{
            success: function(item){

              scope.open(post);
              scope.post = null;
              scope.url = null;

            },
            error: function(item,error){

              JP('Error: '+error.message);

            }
          });

         }

         $interval(function(){scope.loop();},20);

      }
   }

});


App.directive('youtube',function($window,$interval){

   return {
      restrict: 'E',
      scope: {
         post: '='
      },
      templateUrl: '/angularjs/templates/youtube-video.html',
      link: function(scope,element,attrs){

         var youtubeRegexp = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/ig;
         scope.id = scope.post.resource.url.replace(youtubeRegexp,'$1');

         scope.post.player = new YT.Player(element.children()[0].children[0],{
            videoId: scope.id,
            playerVars: {
               autoplay: 0,
               controls: 1
            },
            start_time: 0,
            events: {
               onReady: function(event){
                  if (!scope.post.sound){
                     scope.post.player.mute();
                  }
                  $interval(function(){},1);
               }
            }
         });

      }
   }

});

App.directive('postPlayer',function($window,$interval){

   return {
      restrict: 'E',
      scope: {
         post: '='
      },
      templateUrl: '/angularjs/templates/post-player.html',
      link: function(scope,element,attrs){

        var youtubeRegexp = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/ig;
        var videoid = scope.post.resource.url.replace(youtubeRegexp,'$1');

        var el = element.children()[0].children[1].children[0].children[0];
        JP(el);

        scope.player = new YT.Player(el,{
          videoId: videoid,
          playerVars: {
            autoplay: 0,
            controls: 0
          },
          events: {
            onReady: function(event){
              if (!scope.post.sound){
                scope.player.mute();
              }
              scope.player.seekTo(scope.post.start_time);
              $interval(function(){scope.loop();},1);
            }
          }
        });

        scope.loop = function(){

          if (scope.post.loop && scope.player.B.playerState == 1){

            if (scope.player.getCurrentTime() < scope.post.start_time){

              scope.player.seekTo(scope.post.start_time,true);

            }

            if (scope.player.getCurrentTime() > (scope.post.start_time+scope.post.loop_duration)){

              scope.player.seekTo(scope.post.start_time,true);

            }

          }

        };

      }
   }

});

App.directive('select',['$window',function($window){
    return {
        restrict: 'A',
        link: function(scope,element,attrs){

            element.on('click',function(){

                if (!$window.getSelection().toString()){

                    this.setSelectionRange(0, this.value.length)

                }

            });

        }
    };
}]);

App.directive('duration',function($window){

   return {
      restrict: 'E',
      templateUrl: '/angularjs/templates/duration.html',
      replace: true,
      scope: {
         ngModel: '='
      },
      link: function(scope,element,attrs){

         scope.$watch('ngModel',function(newValue){

            var duration = moment.duration(newValue,'seconds');

            scope.splitTime = {
               hours: duration.hours(),
               minutes: duration.minutes(),
               seconds: duration.seconds()
            }

         });
         
         scope.$watchCollection('splitTime',function(newTime,oldTime){

            scope.ngModel = moment.duration(newTime,'seconds').asSeconds();

         });

      }

   };

});



App.directive('categoryMenu',function($window){

   return {
      restrict: 'E',
      templateUrl: '/angularjs/templates/category-menu.html',
      link: function(scope,element,attrs){

        scope.getCategories = function(){

          var Categories = Parse.Object.extend('Categories');
          var query = new Parse.Query(Categories);
          query.find({
            success: function(results){

              scope.categories = results.map(function(item){

                var _category = new Category(item);
                _category.getSections();

                return _category;

              });

            },
            error: function(error){

              JP("Error: " + error.code + " " + error.message);

            }
          });

        };
        scope.getCategories();

      }

   };

});