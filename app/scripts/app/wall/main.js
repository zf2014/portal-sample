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




myapp.controller('gameController', ['TimeService', '$routeParams', function(TimeService, $routeParams){
	var ts = new TimeService(+$routeParams.secs),
		self = this
	;
	this.rule_is_show = true;
	this.secs = ts.num2Arr();
	this.launch = function(){
		self.rule_is_show = false;
		console.log('开始倒计时...')
	}
}]);

myapp.factory('TimeService', ['$interval', function($interval){
	var TimeService = function(secs){
		this.seconds = secs || 0;
	};

	TimeService.prototype = {
		num2Arr: function(){
			var arr = [],
				size = 3
			;
			arr = String.prototype.split.call(this.seconds, '')
			while(arr.length < size){
				arr.unshift('0');
			}
			return arr;
		},

		countdown: function(){

		}

	}
	return TimeService;
}])


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
		controller: ['$scope', function($scope){
			this.active = false;
			this.show = function(){
				this.active = true;
			}
			this.hide = function(){
				this.active = false;
			}

			this.list = [
				{link: '#/wall/runman/100'},
				{link: '#/wall/runman/120'},
				{link: '#/wall/runman/140'},
				{link: '#/wall/runman/160'},
				{link: '#/wall/runman/180'},
				{link: '#/wall/runman/200'},
				{link: '#/wall/runman/220'}
			]

		}],
		controllerAs: 'menuCtrl',
		templateUrl: 'include/menuFTL.html',
		link: linkFn
	}
}])