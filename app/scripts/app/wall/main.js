var myapp = angular.module('wq-wall-app', ['ngRoute']);

// myapp.config(['$locationProvider', function($locationProvider){
// 	$locationProvider.hashPrefix('!');
// }])

// 路由器
myapp.config(['$routeProvider', 'menuLinks', function($routeProvider, menuLinks){
	var defaultLink;
	menuLinks.forEach(function(link){
		if(link.active === true){
			defaultLink = link.link;
			return false;
		}
	});

	defaultLink = defaultLink || menuLinks[0].link;
	$routeProvider
	.when('/wall/:game/:secs', {
		controller: 'gameController',
		controllerAs: 'gameCtrl',
		templateUrl: function(params){
			return 'include/' + params['game'] + 'FTL.html'
		}
	}).otherwise(defaultLink.trim())
}]);

// 游戏 -- 控制器
myapp.controller('gameController', ['$routeParams', '$interval', '$timeout', 'gameService', function($routeParams, $interval, $timeout, gameService){
	var self = this;
	var COUNT_NUM = 5;
	this.rule_is_show = true;
	this.begin = false;
	this.secs = +$routeParams.secs;
	this.countdown = {
		count: COUNT_NUM,
		active: false
	}
	this.end = false

	this.launch = function(){

		gameService.launch().then(function(isOk){
			if(isOk){
				self.rule_is_show = false;
				doCountdown();
			}
		})
	}

	/*再玩一次*/
	this.playAgain = function(){
		this.end = false;
		this.begin = false;
		this.countdown.count = COUNT_NUM;
		this.secs = +$routeParams.secs;
		this.rule_is_show = true;
		// doCountdown();
	}

	// 游戏倒计时
	function duration(){
		var intervalChanelId;
		intervalChanelId = $interval(function(){
			self.secs -= 1;
			if(self.secs === 0){
				$interval.cancel(intervalChanelId);
				$timeout(function(){
					self.end = true;
				}, 2000)
			}
		}, 1000);
	}

	// 游戏开始倒计时
	function doCountdown(){
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

// 游戏服务
myapp.service('gameService', ['$http','$routeParams', 'appRoot', 'inviterCode', 'gameCode', function($http, $routeParams, appRoot, inviterCode, gameCode){
	this.launch = function(){
		var launchParams = [
				['inviterCode', inviterCode],
				['gameCode', gameCode[$routeParams.game]],
				// ['gameGroup', '1'],
				['gameTime', $routeParams.secs]
			]
		launchParams = launchParams.map(function(p){
			return p[0] + '=' + p[1]
		}).join('&')


		return $http.get(appRoot + '/portal/admin/screen/gameCenter!gameOpen.jspa' + '?' + launchParams)
			.then(function(ajaxData){
				if(ajaxData.data.code === 0){
					return true;
				}else{
					return false;
				}
			})
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
});

// 跑男 -- 组件
myapp.directive('wqRunmanRuleMembers', [function(){
	var linkFn = function($scope, $element, attrs, ctrl){
	}
	return {
		restrict: 'EA', 
		scope: {},
		controller: ['$interval', 'runmanService', function($interval, runmanService){
			var self = this;
			runmanService.getLastMembers().then(function(members){
				self.members = members;
			})
		}],
		controllerAs: 'memberCtrl',
		templateUrl: 'include/runmanRuleMemberFTL.html',
		link: linkFn
	}
}]);

// 跑男 -- 组件
myapp.directive('wqRunmanMember', ['$routeParams', 'runmanService', function($routeParams, runmanService){
	return {
		restrict: 'A', 
		scope: {},
		controller: ['$interval', 'runmanService', function($interval, runmanService){
			var self = this;
			runmanService.members.then(function(members){
				self.members = members;
			})

		}],
		controllerAs: 'memberCtrl',
		templateUrl: 'include/runmanMemberFTL.html',
		link: function(){}
	}
}]);
// 跑男 -- 组件
myapp.directive('wqRunmanDoll', ['runmanService', '$routeParams', function(runmanService, $routeParams){
	var linkFn = function($scope, $element, attrs, ctrl){
		var tl = new TimelineMax({onComplete: onComplete});
		
		var totalSec = $routeParams.secs;
		var durationSec = 10;
		var totalTimes = totalSec/durationSec;
		var percent = 100/totalTimes;
		var runData = []
		var runPercent = 0 ;
		var runTimes = 1;

		var index = attrs.index;

		tl.add(TweenLite.to($element[0], durationSec, {left: '+='+percent+'%', ease: Power0.easeNone, onComplete: function(){
			runPercent = percent;
		}}));


		function onComplete(){
			var max;
			var prev;
			var next;
			if( totalTimes !== runTimes ){
				runTimes += 1;
				runmanService.getRunMessage().then(function(runData){
					console.log('[%s]总共跑了 %s', index, runPercent);
					max = Math.max.apply(Math, runData)
					prev = runPercent;
					next = (runTimes*percent - prev)*(runData[index]/max);
					tl.add(TweenLite.to($element[0], durationSec, {left: '+='+(next)+'%', ease: Power0.easeNone, onComplete: function(){
						runPercent = prev + next;
					}}))
				});
			}else{
				console.log('>[%s]总共跑了 %s', index, runPercent);

				tl.add(TweenLite.to($element[0], 2, {left: '+=100%', ease: Power0.easeNone, onComplete: function(){
					tl.kill();
				}}));
				
			}
		}
	};
		return {
		restrict: 'A',
		scope: {},
		controller: ['$interval', 'runmanService', function($interval, runmanService){
		}],
		controllerAs: 'dollCtrl',
		link: linkFn
	}
}])
// 跑男 -- 组件
myapp.directive('wqRunmanRank', ['$routeParams', 'runmanService', function($routeParams, runmanService){
	return {
		restrict: 'A',
		scope: {},
		controller: ['runmanService', function(runmanService){
			var self = this;
			runmanService.getRank().then(function(data){
				self.ranks = data;
			})
		}],
		controllerAs: 'rankCtrl',
		templateUrl: 'include/runmanRankFTL.html',
		link: function($scope, $element, attrs, ctrl){
			console.log(ctrl)
		}
	}
}]);

// 跑男 -- 服务器
myapp.service('runmanService', ['$http', '$routeParams', 'appRoot', 'inviterCode', 'gameCode', function($http, $routeParams, appRoot, inviterCode, gameCode){
	var duration = $routeParams.secs;
	var maxRuningNumber = 0;
	var self = this;

	// 之前的跑男信息
	this.members = [];

	// 最新的跑男信息
	this.getLastMembers = function(){
		var members = getMembers();
		self.members = members;
		return members;
	}

	this.getRunMessage = (function(){

		var nextRuningTime = 1;
		var pomise; 

		return function(){
			if(nextRuningTime === 1){
				pomise =  $http.get(appRoot + '/portal/admin/screen/runningman!runningResult.jspa?inviterCode=' + inviterCode + '&gameCode=' + gameCode[$routeParams.game])
				.then(function(ajaxData){
					var result, data = ajaxData.data;
					if(data.code === 0){
						result =  data.rst.gameResult.map(function(user){
							return user.gameResult;
						})
					}
					return result
				})
	   		}
	   		nextRuningTime += 1;
	   		if(nextRuningTime > maxRuningNumber){
	   			nextRuningTime = 1;
	   		}

		   	return pomise;
		}

	})();

	this.getRank = function(){
		var pomise =  $http.get(appRoot + '/portal/admin/screen/runningman!runningRank.jspa?inviterCode=' + inviterCode + '&gameCode=' + gameCode[$routeParams.game])
			.then(function(ajaxData){
				var result, data = ajaxData.data;
				if(data.code === 0){
					result =  data.rst.gameResult.map(function(rank){
						return {
							name: rank.nickname,
							avatar: rank.headimgurl,
							no: rank.gameRank
						}
					})
				}
				return result
			})
		return pomise
	}

	// 从服务器上读取信息
	function getMembers(){
		return $http.get(appRoot + '/portal/admin/screen/runningman!getGameUser.jspa')
			   .then(function(ajaxData){
					var result, data = ajaxData.data;
					if(data.code === 0){
						result =  data.rst.gameUsers.map(function(user){
							return {
								name: user.nickname,
								gender: user.sex == '0' ? 'male':'female',
								duration:duration
							}
						});
						maxRuningNumber = result.length;
					}
					return result
				})
	}

}]);


// 猜拳 -- 组件
myapp.directive('wqCaiquanPlayer', [function(){
	return {
		restrict: 'A', 
		scope: true,
		controller: ['caiquanService', function(caiquanService){
			var self = this
			;
			this.players = caiquanService.getPlayers();
			this.nextRank = function(){
				this.players = caiquanService.getPlayers();
			}
		}],
		controllerAs: 'palyCtrl',
		templateUrl: 'include/caiquanPlayFTL.html'
	}
}]);

// 猜拳 -- 服务器
myapp.service('caiquanService', ['$http', function($http){
	this.getPlayers = function(){
		var thePlayers = [
			{name: '张小二', rank: 'up'},
			{name: '王小四', rank: 'down'},
			{name: '王小二', rank: 'fair'},
			{name: '李小六', rank: 'up'},
			{name: '张大爷', rank: 'down'}
		]
		return randomSort(thePlayers);
	}
}]);



// 菜单 -- 组件
myapp.directive('wqMenu', ['$rootScope', '$document',function($rootScope, $document){
	var linkFn = function($scope, $element, attrs, ctrl){
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
		controller: ['$scope', '$location', 'menuLinks', function($scope, $location, menuLinks){
			var self = this
			;
			this.active = false;

			this.show = function(){
				this.active = true;
			}
			this.hide = function(){
				this.active = false;
			}
			this.list = menuLinks;

			this.menuClick = function(url){
				activeTargetMenuLinkByUrl(url);
				$location.url(url);
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
				activeTargetMenuLinkByUrl($location.url())
			}
			init();
		}],
		controllerAs: 'menuCtrl',
		templateUrl: 'include/menuFTL.html',
		link: linkFn
	}
}]);



function randomArray(arrLen) {
    var rArr = new Array(arrLen);
    for (var i = 0; i<arrLen; i++) {
        rArr[i] = Math.random();
    }
    return rArr;
}

function randomIndex(arrLen) {
    var iArr = new Array(arrLen);
    var rArr = randomArray(arrLen);  //建立随机数组,以备使用
    for (var i = 0; i<arrLen; i++) {  //遍历数组,寻找最小的数字
        iArr[i] = i;  //默认被比较的数字为最小数字,并记录索引
        var t = rArr[i];  //记录该数字在临时变量中
        for (var j = 0; j<arrLen; j++) {  //与所有数字进行比较
            if (rArr[j]<t) {  //如果发现更小的数字,则更新
                iArr[i] = j;
                t = rArr[j];
            }
        }
        delete t;
        rArr[iArr[i]] = 1;  //将最小的数字设置成1.
    }
    return iArr;
}

function randomSort(arr) {
    arrLen = arr.length;
    var tArr = new Array(arrLen);  //建立临时数组,存放随机打乱的数组
    var iArr = randomIndex(arrLen);  //建立随机索引
    for (var i = 0; i<arrLen; i++) {
        tArr[i] = arr[iArr[i]]; //根据随机索引完全打乱数组中所有的值
    }
    return tArr;
}