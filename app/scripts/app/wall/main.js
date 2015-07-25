var myapp = angular.module('wq-wall-app', ['ngRoute']);


myapp.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/wall/:game/:secs', {
		controller: 'gameController',
		controllerAs: 'gameCtrl',
		templateUrl: function(params){
			return 'include/' + params['game'] + 'FTL.html'
		}
	})
	.otherwise({
		redirectTo: '/wall/runman/180'
	})

}]);




myapp.controller('gameController', ['$routeParams', '$interval', function($routeParams, $interval){
	var self = this;
	this.rule_is_show = true;
	this.secs = +$routeParams.secs
	this.launch = function(){
		var intervalChanelId;
		self.rule_is_show = false;
		intervalChanelId = $interval(function(){
			self.secs -= 1;
			if(self.secs === 0){
				$interval.cancel(intervalChanelId);
			}
		}, 1000);
	}

}]);


myapp.filter('secondsSplit', function(){
	return function(input, size){
		var size = size || 3,
			output
		;
		output = String.prototype.split.call(input, '');
		while(output.length < size){
			output.unshift('0');
		}
		return output;
	}
})



myapp.directive('wqMenu', ['$rootScope', '$document',function($rootScope, $document){
	var linkFn = function($scope, $elemnt, attrs, ctrl){
		var $body = angular.element($document[0].body);
		$body.on('mouseenter', function(){
			ctrl.show();
			$scope.$apply();
		});
		$body.on('mouseleave', function(){
			ctrl.hide();
			$scope.$apply();
		});


	}
	return {
		restrict: 'A', 
		controller: ['$scope', '$location', function($scope, $location){
			var self = this
			;
			this.active = false;

			this.show = function(){
				this.active = true;
			}
			this.hide = function(){
				this.active = false;
			}
			this.list = [
				{link: '#/wall/runman/100', active: false},
				{link: '#/wall/runman/120', active: false},
				{link: '#/wall/runman/140', active: false},
				{link: '#/wall/runman/160', active: false},
				{link: '#/wall/runman/180', active: false},
				{link: '#/wall/runman/200', active: false},
				{link: '#/wall/runman/220', active: false}
			]

			this.menuClick = function(url){
				activeTargetMenuLinkByUrl(url);
			}
			function activeTargetMenuLinkByUrl(url){
				angular.forEach(self.list, function(menuItem){
					if(menuItem.link === url){
						menuItem.active = true;
					}else{
						menuItem.active = false;
					}
				})
			}
			function init(){
				activeTargetMenuLinkByUrl('#' + $location.url())
			}
			init();
		}],
		controllerAs: 'menuCtrl',
		templateUrl: 'include/menuFTL.html',
		link: linkFn
	}
}])