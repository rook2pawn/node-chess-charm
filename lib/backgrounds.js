var bg = function() {
    var bgindex = 0;
    var cycleColors = function() {
        var length = backgrounds.length;
        if (bgindex < length - 1) {
            bgindex++;
        } else {
            bgindex = 0;
        }
    }; 
    
    var backgrounds = [];
    backgrounds.push({dark:'black',light:'white',pieceDark : 'red',pieceLight: 'blue'});
    backgrounds.push({dark:'blue',light:'yellow',pieceDark : 'black',pieceLight: 'white' });
    backgrounds.push({dark:'black',light:'cyan',pieceDark : 'magenta',pieceLight: 'white'});
    var bgindex = 0;
    return {
        cycleColors : function() {
            cycleColors();
        },
        backgrounds : function() {
            return backgrounds;
        },
        getDarkSquare : function() {
            return backgrounds[bgindex].dark;
        },
        getLightSquare : function() {
            return backgrounds[bgindex].light;
        },
        getPieceDark : function() {
            return backgrounds[bgindex].pieceDark;
        },
        getPieceLight : function() {
            return backgrounds[bgindex].pieceLight;
        },
    }
};
module.exports = bg;
