
module.exports = Config;


function Config(sprites){
    var obj = {};

    sprites.forEach(function(item){
        obj[item] = {
            src: '<%= product.app %>/images/'+item+'/sprite/*.png',
            dest: '<%= product.app %>/images/'+item+'/sprite.png',
            destCss: '<%= product.app %>/stylus/app/'+item+'/sprites.styl',
            imgPath: '../images/' + item + '/sprite.png',
            cssVarMap: function(sprite){
            	sprite.name = 'ico-sprite-' + sprite.name;
            }

        }
    });

    return obj;

}