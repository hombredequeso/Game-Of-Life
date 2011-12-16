MCAPP.namespace('MCAPP.gameOfLife.context');

MCAPP.gameOfLife.context = (function() {
    return {
        create: function(gameModule, renderer){
            var board, boardRenderer = renderer, module = gameModule, animationTimer, canvas, ratio = 50;
            return {
                init: function(canvasIn) {
                    canvas = canvasIn;
                    this.reset();
                },
                reset: function (){
                    animationTimer = MCAPP.periodicTimer.create(300, this.next);
                    board = module.createBoard();
                    module.randomizeBoard(ratio/100.0, board);
                    boardRenderer.render(board);
                },

                next: function () {
                    board = module.move(board);
                    boardRenderer.render(board);
                },

                startAnimation: function () {
                    animationTimer.start();
                },

                stopAnimation: function () {
                    animationTimer.stop();
                },

                setAnimationInterval: function (newInterval) {
                    var interval = 1000/newInterval;
                    animationTimer.setInterval(interval);
                },
                boardClick: function (cell)
                {
                    module.toggle(board, cell.x, cell.y);
                    boardRenderer.render(board);
                },

                setNotLiveProportion: function (newRatio)
                {
                    ratio = newRatio;
                }
            };
        }
    }
}());