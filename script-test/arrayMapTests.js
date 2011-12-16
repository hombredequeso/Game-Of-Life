TestCase("ArrayMapTests", {
    testMapAddOne:function(){
        var arrayIn = [10,11,12,13,14];
        var expectedResult = [11,12,13,14,15];
        var addOne = function(x) {return x + 1};
        var result = arrayIn.map(addOne);
        assertEquals(expectedResult, result)
    },
    testMapAddToPrevious:function() {
        var arrayIn = [10,11,12,13,14];
        var expectedResult = [20,21,23,25,27];
        var addToPrevious = function(x, index){
            return x + this[index -1 < 0? 0:index-1];
        };
        var result = arrayIn.map(addToPrevious, arrayIn);
        assertEquals(expectedResult, result)
    },
    testMapAddingToThis:function(){
        var context = {
            data : [10,11,12,13,14],
            hitCount: 0
        };
        var modifyThis = function(x) {
            this.hitCount+=1;
            return x;
        };
        var result = context.data.map(modifyThis, context);
        assertEquals(context.data.length, context.hitCount);
    },
    testMatrixModification:function(){
        var context = {
            area : Array.matrix(2, 2, 0)
        };
        var rowCallback = function(x, i) {
            this.x = i;
            return this.area.map(columnCallback, this);
        };
        var columnCallback = function(e, i){
            x = this.x;
            y = i;
            return x + ',' + y;
        };
        var result = context.area.map(rowCallback, context);
        assertEquals(2, result.length);
    },
    testMatrixRecalc:function(){
        var context = {
            area : Array.matrix(2, 2, 0),
            recalc : function(x, y) {return 1;}
        };
        var rowCallback = function(x, i) {
            this.x = i;
            return this.area.map(columnCallback, this);
        };
        var columnCallback = function(e, i){
            return this.recalc(this.x, i);
        };
        var nextArea = context.area.map(rowCallback, context);
        assertEquals(Array.matrix(2,2,1), nextArea);
    }
  });