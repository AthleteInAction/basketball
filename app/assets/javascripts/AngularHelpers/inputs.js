App.directive('onstop',function(){
    return function (scope, element, attrs) {
        element.bind('keyup', function (event) {

        	if (attrs.delay){
        		this.delay = attrs.delay;
        	} else {
        		this.delay = 300;
        	}

        	if (this.timer){clearTimeout(this.timer);}
        	
        	this.timer = setTimeout(function(){scope.$eval(attrs.onstop);},this.delay);

        });
    };
});

App.directive('onenter',function(){
    return {

        restrict: 'A',
        link: function(scope,element,attrs){
    
            element.bind('keydown',function(event){
    
                if(event.which === 13 && !event.shiftKey){
    
                    scope.$apply(function (){
                        scope.$eval(attrs.onenter);
                    });
    
                    event.preventDefault();
    
                }
    
            });
    
        }

    }
});

App.directive('shiftnewline',function(){
    return {

        link: function(scope,element){

            element.bind('keyup',function(event){

                if (event.keyCode == 13 && event.shiftKey){
                    var content = this.value;
                    var caret = getCaret(this);
                    this.value = content.substring(0,caret)+""+content.substring(caret,content.length);
                    event.stopPropagation();
                }

            });

        }

    }
});