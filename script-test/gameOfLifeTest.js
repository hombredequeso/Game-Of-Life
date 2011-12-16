TestCase("GameOfLifeTestCase", {
    testCreateBoard:function(){
        var module=MCAPP.gameOfLife;
        var initalBoard = module.createBoard();
        assertEquals(50, initalBoard.length);
        assertEquals(50, initalBoard[0].length);
    },

    testTurnReturnsBoardOfSameSize:function() {
        var module=MCAPP.gameOfLife;
        var initalBoard = module.createBoard();
        var nextBoard = module.move(initalBoard);
        assertEquals(initalBoard.length, nextBoard.length);
        assertEquals(initalBoard[0].length, nextBoard[0].length);
    },

    testNext_MidBoardPosition_HasEightNeighbours: function(){
        var module=MCAPP.gameOfLife;
        var initalBoard = module.createBoard();
        var neighbours = module.getNeighbours(initalBoard, 10, 10);
        assertEquals(8, neighbours.length);
    },
    testNext_CornerPosition_HasThreeNeighbours: function() {
        var module=MCAPP.gameOfLife;
        var initalBoard = module.createBoard();
        var neighbours = module.getNeighbours(initalBoard, 0, 0);
        assertEquals(3, neighbours.length);
    },
    testNext_BottomRightCornerPosition_HasThreeNeighbours: function() {
        var module=MCAPP.gameOfLife;
        var initialBoard = module.createBoard();
        var neighbours = module.getNeighbours(initialBoard, initialBoard.length-1, initialBoard[0].length-1);
        assertEquals(3, neighbours.length);
    },
    testNext_BottomRightCornerPosition_HasThreeNeighbours: function() {
        var module=MCAPP.gameOfLife;
        var initialBoard = module.createBoard();
        var neighbours = module.getNeighbours(initialBoard, 0, initialBoard[0].length/2);
        assertEquals(5, neighbours.length);
    },
    test_alldead_getNextState_ReturnsZero: function() {
        var module=MCAPP.gameOfLife;
        var x = [0,0,0,0,0,0,0,0];
        var liveCount = module.getLiveCount(x);
        assertEquals(0, liveCount);
    },
    // Any live cell with fewer than two live neighbours dies, as if caused by under-population.
    test_GameRule1: function() {
        assertEquals(0, MCAPP.gameOfLife.getNextState(1, 0));
        assertEquals(0, MCAPP.gameOfLife.getNextState(1, 1));
    },
    // Any live cell with two or three live neighbours lives on to the next generation.
    test_GameRule2: function() {
        assertEquals(1, MCAPP.gameOfLife.getNextState(1, 2));
        assertEquals(1, MCAPP.gameOfLife.getNextState(1, 3));
    },
    // Any live cell with more than three live neighbours dies, as if by overcrowding.
    test_GameRule3: function() {
        assertEquals(0, MCAPP.gameOfLife.getNextState(1, 4));
        assertEquals(0, MCAPP.gameOfLife.getNextState(1, 5));
        assertEquals(0, MCAPP.gameOfLife.getNextState(1, 6));
        assertEquals(0, MCAPP.gameOfLife.getNextState(1, 7));
        assertEquals(0, MCAPP.gameOfLife.getNextState(1, 8));
    },
    // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
    test_GameRule4: function() {
        assertEquals(1, MCAPP.gameOfLife.getNextState(0, 3));
    },
    // and the rest...
    test_GameRule5: function() {
        assertEquals(0, MCAPP.gameOfLife.getNextState(0, 0));
        assertEquals(0, MCAPP.gameOfLife.getNextState(0, 1));
        assertEquals(0, MCAPP.gameOfLife.getNextState(0, 2));
        assertEquals(0, MCAPP.gameOfLife.getNextState(0, 4));
        assertEquals(0, MCAPP.gameOfLife.getNextState(0, 5));
        assertEquals(0, MCAPP.gameOfLife.getNextState(0, 6));
        assertEquals(0, MCAPP.gameOfLife.getNextState(0, 7));
        assertEquals(0, MCAPP.gameOfLife.getNextState(0, 8));
    },
    test_Next_ReturnsAllValidStates: function() {
        var x, y;
        var module=MCAPP.gameOfLife;
        var board = module.createBoard();
        module.randomizeBoard(0.5, board);
        var newBoard = module.move(board);
        assertEquals(board.length, newBoard.length);
        assertEquals(board[0].length, newBoard[0].length);
        for (x=0; x<newBoard.length; x+=1){
            for(y=0; y<newBoard[0].length; y +=1) {
                assertTrue(newBoard[x][y] === 0 || newBoard[x][y] === 1);
            }
        }
    }
});