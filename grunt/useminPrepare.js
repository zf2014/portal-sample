module.exports = {
    config: {
    	options: {
    		dest: '<%= product.dist %>'
    	},

    	html: '<%= product.app %>/view/{,*/}*.{html,ftl}'
    }
}