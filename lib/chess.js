exports.getPiece = function(board,pos, perspective){
    // pos i.e. {row:[1-8], col:[1-8]} where row 1 is on perspective's side.
    var _board = board.slice(0); // work on a copy 
    if (perspective == 'black') {
        _board.reverse();
    }
    var startpiece = _board[pos.row - 1][pos.col];
    return startpiece;
};

// MSAN modern standard algebraic notation move
// just designate from position TO new position.
// i.e.e2e4 designates kings pawn white two spaces
// captures aren't indicated, you just move ontop
// e1g1 == kingside castle
// e1c1 == queenside castle
exports.updateBoardMSAN = function(board,msanMove){
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
exports.isWhite = function(character) {
    if ((character !== undefined) || (character !== '1')) {
       return (character.toUpperCase() === character); 
    }
    return false;
};
exports.startboard = [['R','N','B','Q','K','B','N','R'],
['P','P','P','P','P','P','P','P'],
['1','1','1','1','1','1','1','1'],
['1','1','1','1','1','1','1','1'],
['1','1','1','1','1','1','1','1'],
['1','1','1','1','1','1','1','1'],
['p','p','p','p','p','p','p','p'],
['r','n','b','q','k','b','n','r']];
exports.pieces = {
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

