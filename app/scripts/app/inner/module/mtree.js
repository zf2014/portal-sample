define(['jquery', 'utils', 'common/fast-jquery', 'tree'], function($, S, $$){


	var Tree = function(target, nodes, settings){
		var alen = arguments.length;
		var self = this;

		this.target = $(target);
		this.nodes = nodes;
		this.settings = {
			data: {
				keep: {
					parent: true
				},
				simpleData: {
					enable: true
				}
			}
		};

		if(S.isFunction(settings)){
			this.settings.callback = {
				onClick: settings
			}
		}

		if(settings && S.isPlainObject(settings)){
			S.mix(this.settings, settings);
		}




		this.init();
	}


	Tree.prototype.init = function(){
		this.tree = $.fn.zTree.init(this.target, this.settings, this.nodes);
	};

	Tree.prototype.addNode = (function(){

		function getParentNode(node){
			if(!node.isParent){
				return node.getParentNode();
			}
			return node;
		}

		return function(data){
			var selectedNodes = this.tree.getSelectedNodes();
			var self = this;
			if(selectedNodes.length){
				S.each(selectedNodes, function(node){
					var parent = getParentNode(node),
						nodeData = data;
					;
					if(isTopNode(parent)){
						nodeData = S.merge(data, {isParent: true});
					}
					self.tree.addNodes(parent, nodeData);
				});
			}else{
				self.tree.addNodes(null, data);
			}
		}
	})();

	Tree.prototype.deleteNode = function(force){
		var selectedNodes = this.tree.getSelectedNodes();
		var self = this;

		if(selectedNodes.length){
			S.each(selectedNodes, function(node){
				if(!force && isTopNode(node)){
					self.tree.cancelSelectedNode(node);
					return;
				}
				self.tree.removeNode(node);

			});
		}
	};

	Tree.prototype.updateNode = function(data){
		var node = this.getOneSelectedNode();
		for(var key in data){
			node[key] = data[key];
		}
		this.tree.updateNode(node);
	};

	Tree.prototype.hasSelected = function(){
		return this.tree.getSelectedNodes().length > 0;
	};

	Tree.prototype.getOneSelectedNode = function(){
		return this.tree.getSelectedNodes()[0];
	};

	Tree.prototype.cancelSelectedNodes = function(){
		this.tree.cancelSelectedNode();
	}

	Tree.prototype.isTop = function(){
		return isTopNode(this.getOneSelectedNode());
	};


	function isTopNode(node){
		return node.level === 0;
	}
	return Tree;

})