MCAPP.namespace('MCAPP.gameOfLife');

MCAPP.gameOfLife = (function() {
    var xSize = 50, ySize = 50;
    return {
        createBoard: function(){
            return Array.matrix(xSize, ySize, 0);
        },
        randomizeBoard: function(liveProbability, board) {
            var x, y;
            for(x=0;x<xSize;x+=1){
                for(y=0;y<ySize;y+=1)
                    board[x][y] = (Math.random() < liveProbability) ? 0:1;
            }
        },
        move: function(board) {
            var x, y, boardx, newboardx, newboard = Array.matrix(xSize, ySize, 0);
            for(x=0, xSize; x< xSize; x++) {
                for(y=0, boardx = board[x], newboardx = newboard[x]; y<ySize; y++) {
                    newboardx[y] = this.getNextState(boardx[y], this.getLiveCount(this.getNeighbours(board, x, y)))
                }
            }
            return newboard;
        },
        getNeighbours: function(board, x, y){
            var
                n =[], xi,yi,
                xMin = Math.max(0, x-1),
                xMax = Math.min(xSize-1, x+1),
                yMin = Math.max(0, y-1),
                yMax = Math.min(ySize-1, y+1);
            for(xi=xMin; xi<=xMax;xi++) {
                for(yi=yMin; yi<=yMax;yi++) {
                    if (!(xi ===x && yi ===y))
                        n[n.length] = board[xi][yi];
                }
            }
            return n;
        },
        getLiveCount: function(neighbours) {
            var liveElements = neighbours.filter(function(e){return e===1;});
            return liveElements.length;
        },
        getNextState: function(currentState, liveCount) {
            if (currentState === 1 && liveCount < 2) return 0;
            if (currentState === 1 && liveCount > 3) return 0;
            if (currentState === 1) return 1;
            if (currentState === 0 && liveCount === 3) return 1;
            return 0;
        },
        toggle: function(board, x, y) {
            board[x][y] = board[x][y] === 1? 0:1;
        }
    };
}());