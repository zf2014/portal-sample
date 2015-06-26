module.exports = Config;

function Config(c){
    this.options = {
        blockReplacements: {
            datasrc: function (block) {
                var raw = block.raw,
                    lines = [],
                    datasrcHtml
                ;
                raw.forEach(function(line, idx){
                    if(idx === 0 || (idx === raw.length - 1) ){
                        return;
                    }
                    lines.push(line);
                });

                datasrcHtml = lines.join('\n').replace(block.src[0], c.staticRoot + block.dest);
                
                return datasrcHtml;
            },
            // TODO
            css: function (block) {
                var media = block.media ? ' media="' + block.media + '"' : '';
                return '<link rel="stylesheet" href="' + c.staticRoot + block.dest + '"' + media + '>';
            },

            // TODO
            js: function (block) {
                var defer = block.defer ? 'defer ' : '';
                var async = block.async ? 'async ' : '';
                return '<script ' + defer + async + 'src="' + c.staticRoot + block.dest + '"><\/script>';
            }
        },
        assetsDirs: [
            '<%= product.dist %>',
            '<%= product.dist %>/images',
            '<%= product.dist %>/css'
        ]
    };
    this.html = ['<%= product.dist %>/{,*/}*.{ftl,html}'];
    this.css = ['<%= product.dist %>/css/{,*/}*.css'];
}