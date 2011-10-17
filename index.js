var charm = require('charm')(process);
var chessCharm = function(obj) {
    charm.on('^C',function() {
        charm.foreground('green');
        charm.background('black');
        process.exit();
    });
    charm.reset();
    charm.cursor(false);
    var board = undefined;
    var blackname = whitename = undefined;
    process.stdin.resume();
    process.stdin.on('keypress', function(char, key) {
        if (key !== undefined) {
            switch (key.name) {
                case 'left': 
                                charm.left(1);
                                break;
                case 'right': 
                                charm.right(1);
                                break;
                case 'up': 
                                charm.up(1);
                                break;
                case 'down':    charm.down(1);
                                break;
                case 'c': 
                                charm.position(function(x,y) {
                                    cycleColors();
                                    self.showBoard();
                                    charm.position(x,y);
                                }); 
                                break;
                default :
                                break;
            }
        }
    });
    var cycleColors = function() {
        var length = backgrounds.length;
        if (bgindex < length - 1) {
            bgindex++;
        } else {
            bgindex = 0;
        }
    }; 
    // MSAN modern standard algebraic notation move
    // just designate from position TO new position.
    // i.e.e2e4 designates kings pawn white two spaces
    // captures aren't indicated, you just move ontop
    // e1g1 == kingside castle
    // e1c1 == queenside castle
    var updateBoardMSAN = function(board,msanMove){
        msanMove = msanMove.toString();
        var _board = board.slice(0); // work on a copy 
        var colHash = {a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8};
        var start = msanMove.slice(0,2).trim(); var end = msanMove.slice(2,4).trim();
        var startrow = start.slice(1,2); var endrow = end.slice(1,2);
        var startcol = colHash[start.slice(0,1)]; var endcol = colHash[end.slice(0,1)];
        var startpiece = _board[startrow-1][startcol-1];
        var endpiece = _board[endrow-1][endcol-1];
        _board[startrow-1][startcol-1] = '1';
        _board[endrow-1][endcol-1] = startpiece;
        // check for enpassant capture. if so, make the correction.
        if ((startpiece.toLowerCase() == 'p') && (startrow == 5 || startrow == 4)
        && (endpiece == '1') && (startcol != endcol)) {
            if (startpiece == 'P') {
                _board[endrow-2][endcol-1] = '1';
            } 
            if (startpiece == 'p') {
                _board[endrow][endcol-1] = '1';
            }
        }
        // its a castle
        if ((startpiece.toLowerCase() == 'k') && (Math.abs(endcol,startcol) > 1)) {
            if (endcol == 7) { // kingside castle
                _board[endrow-1][5] = _board[endrow-1][7];
                _board[endrow-1][7] = '1';
            } 
            if (endcol == 3) { // queenside castle
                _board[endrow-1][3] = _board[endrow-1][0];
                _board[endrow-1][0] = '1';
            };
        } 
        // check for promotion
        if ((startpiece.toLowerCase() == 'p') && ((endrow == 8) || (endrow == 1)) && (msanMove.length == 5)) {
            var promopiece = msanMove.slice(4,5);
            if (endrow == 8) promopiece = promopiece.toUpperCase();
            if (endrow == 1) promopiece = promopiece.toLowerCase();
            _board[endrow-1][endcol-1] = promopiece;
        }
        var color = undefined;
        if (startpiece.toUpperCase() == startpiece) {
            color = 'white';
        } else {
            color = 'black';
        }
        return {board:_board,color:color}
    };
    var isUpperCase = function(character) {
        if ((character !== undefined) || (character !== '1')) {
           return (character.toUpperCase() === character); 
        }
        return false;
    }
    var startboard = [['R','N','B','Q','K','B','N','R'],
    ['P','P','P','P','P','P','P','P'],
    ['1','1','1','1','1','1','1','1'],
    ['1','1','1','1','1','1','1','1'],
    ['1','1','1','1','1','1','1','1'],
    ['1','1','1','1','1','1','1','1'],
    ['p','p','p','p','p','p','p','p'],
    ['r','n','b','q','k','b','n','r']];
    
    // when you view the board from White's perspective, you want to reverse
    // the board
    var whiteView = startboard.slice(0).reverse();
    var blackView = startboard.slice(0);
    var backgrounds = [];
    backgrounds.push({
        dark:'black',
        light:'white',
        pieceDark : 'red',
        pieceLight: 'blue'
    });
    backgrounds.push({
        dark:'blue',
        light:'yellow',
        pieceDark : 'black',
        pieceLight: 'white'
    });
    backgrounds.push({
        dark:'black',
        light:'cyan',
        pieceDark : 'magenta',
        pieceLight: 'white'
    });
    var bgindex = 0;
    var pieces = {
        K: '♔', // U+2654
        Q: '♕', // U+2655
        R: '♖', // U+2656
        B: '♗', // U+2657
        N: '♘', // U+2658
        P: '♙', // U+2659

        k: '♚', //U+265A
        q: '♛', //U+265B
        r: '♜', // U+265C
        b: '♝', // U+265D
        n: '♞',// U+265E
        p: '♟',// U+265F

        1: ' ' // blank
    };
    var self = {};
    // perspective is from either 'white' view or
    // 'black' view 
    self.showBoard = function(newboard,perspective) {
        if (board === undefined) {
            board = startboard;
        }
        if (newboard !== undefined) {
            board = newboard;
        }
        var viewBoard = undefined;
        if (perspective === 'black') {
            viewBoard = board.slide(0);
        } else {
            viewBoard = board.slice(0).reverse();
        }
        for (var row = 0; row <= 7; row++) {
            for (var col = 0; col <= 7; col++) {
                charm.position(col+1,row+1);
                var piece = viewBoard[row][col]
                if ((row+col) % 2 === 1) {
                    charm.background(backgrounds[bgindex].dark);
                } else {
                    charm.background(backgrounds[bgindex].light);
                }
                if (isUpperCase(viewBoard[row][col])) {
                    charm.foreground(backgrounds[bgindex].pieceLight);
                } else {
                    charm.foreground(backgrounds[bgindex].pieceDark);
                }
                charm.write(pieces[piece]);
            }
        }
        return self;
    };
    self.updateBoard = function(newboard) {
        board = newboard;
        return self;
    };
    self.setBlackName = function(name) {
        blackname = name;
        charm.background('black').foreground('white');
        charm.position(12,0);
        charm.write(blackname + " (B)");
        return self;
    };
    self.setWhiteName = function(name) {
        whitename = name;
        charm.background('black').foreground('white');
        charm.position(12,8);
        charm.write(whitename + " (W)");
        return self;
    };
    self.done = function() {
        charm.foreground('green');
        charm.background('black');
        return self;
    };
    self.getWhiteName = function() {
        return whitename;
    };
    self.getBlackName = function() {
        return blackname;
    };
    self.move = function(msanMove) {
        var obj = updateBoardMSAN(board,msanMove);
        board = obj.board;
        if (obj.color == 'black') {
            charm.position(12,2);
            charm.foreground('green').background('black');
            charm.write(msanMove);
        }
        if (obj.color == 'white') {
            charm.position(12,7);
            charm.foreground('green').background('black');
            charm.write(msanMove);
        }
        return self;
    };
    return self;
};
module.exports = exports = chessCharm;
