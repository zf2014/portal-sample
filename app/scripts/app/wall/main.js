var myapp = angular.module('wq-wall-app', ['ngRoute']);

// 路由器
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

// 游戏 -- 控制器
myapp.controller('gameController', ['$routeParams', '$interval', function($routeParams, $interval){
	var self = this;
	this.rule_is_show = true;
	this.begin = false;
	this.secs = +$routeParams.secs;
	this.countdown = {
		count: 5,
		active: false
	}

	this.launch = function(){
		self.rule_is_show = false;
		// duration();
		countdown();
	}

	// 游戏倒计时
	function duration(){
		var intervalChanelId;
		intervalChanelId = $interval(function(){
			self.secs -= 1;
			if(self.secs === 0){
				$interval.cancel(intervalChanelId);
			}
		}, 1000);
	}

	// 游戏开始倒计时
	function countdown(){
		var cd = self.countdown;
		cd.active = true;
		var intervalChanelId;
		intervalChanelId = $interval(function(){
			cd.count -= 1;
			if(cd.count === 0){
				cd.active = false;
				self.begin = true;
				duration();
				$interval.cancel(intervalChanelId);
			}
		}, 1000);

	}

}]);


// 秒数 -- 过滤器
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

// 跑男 -- 组件
myapp.directive('wqRunmanMember', ['$timeout', 'rundistance',function($timeout, rundistance){
	var linkFn = function($scope, $elemnt, attrs, ctrl){
		ctrl.fulllength = $elemnt[0].offsetWidth;
		$scope.$watch(
			function(){
				return ctrl.members;
			}, 
			function(newVal, oldVal){
				var dolls = document.querySelectorAll('.runman-doll');
				angular.forEach(dolls, function(node,idx){
					node.style.left = rundistance(oldVal[idx].score, (ctrl.curtimes - 1), ctrl.totaltimes, ctrl.fulllength)
					$timeout(function(){
						node.style.left = rundistance(newVal[idx].score, ctrl.curtimes, ctrl.totaltimes, ctrl.fulllength)
					}, 100);
				})
		})

	}
	return {
		restrict: 'A', 
		scope: {},
		controller: ['$interval', 'runmanService', function($interval, runmanService){
			var self = this,
				delay = 10000,
				times = 5,
				i = 0,
				intervalId
			;
			self.members = runmanService.getMembers(true);
			self.totaltimes = 5;
			self.curtimes;

			intervalId = $interval(function(){
				i++
				self.members = runmanService.getMembers(false);
				self.curtimes = i;
				if(i === times){
					$interval.cancel(intervalId);
				}
			}, delay);




		}],
		controllerAs: 'memberCtrl',
		templateUrl: 'include/runmanMemberFTL.html',
		link: linkFn
	}
}])


myapp.factory('rundistance', function(){
	return function(input, cur, total, fulllength){
		return fulllength*(input/100)*(cur/total) + 'px';
	}
})

// 跑男 -- 服务器
myapp.service('runmanService', ['$http', function($http){

	this.getMembers = function(isBegin){
		return [
			{name: 'zhangF1', gender: 'male', score: isBegin ? 0: Math.round(Math.random()*100 + 0.5)},
			{name: 'zhangF2', gender: 'female', score: isBegin ? 0: Math.round(Math.random()*100 + 0.5)},
			{name: 'zhangF3', gender: 'male', score: isBegin ? 0: Math.round(Math.random()*100 + 0.5)},
			{name: 'zhangF4', gender: 'female', score: isBegin ? 0: Math.round(Math.random()*100 + 0.5)},
			{name: 'zhangF_', gender: 'female', score: isBegin ? 0: Math.round(Math.random()*100 + 0.5)}
		];
	}
}]);



// 菜单 -- 组件
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