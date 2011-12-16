MCAPP.namespace('MCAPP.gameOfLife.renderer');

MCAPP.gameOfLife.renderer = (function() {
    var GetKey = function()
    {
        var k=[];
        k[0] = "white"
        k[1] = "black";
        return k;
    };

    var DrawField = function(ctx, field, key) {
        var x,y, fieldx, size=10, rectX, xMax = field.length, yMax = field[0].length;
        ctx.beginPath();
        for (x=0;x<xMax;x=x+1) {
            fieldx = field[x];
            rectX = x*10;
            for (y=0;y<yMax;y=y+1){
                    ctx.fillStyle = fieldx[y] < key.length? key[field[x][y]]:'black';
                    ctx.fillRect(rectX, y*size, size, size);
            }
        }
        ctx.stroke();
    };

    var DrawGrid = function(ctx, xMin, yMin, rows, columns, size) {
        var x,y,xMax=xMin+(rows*size),yMax=yMin+(columns*size);
        ctx.strokeStyle = "grey";
        ctx.beginPath();
        for (x=xMin; x<=xMax; x = x+size){
          ctx.moveTo(x+0.5,yMin);
          ctx.lineTo(x+0.5,yMax);
        }
        for (y=0; y<=yMax; y = y+size){
          ctx.moveTo(xMin,y+0.5);
          ctx.lineTo(xMax,y+0.5);
        }
        ctx.stroke();
    };

    return {
        create : function(ctx) {
            var renderer = {
                context : ctx,
                render : function(board) {
                    DrawField(this.context, board, GetKey());
                    DrawGrid(this.context,0,0,board.length, board[0].length, 10);
                }
            };
            return renderer;
        }
    };
}());
