MCAPP.namespace('MCAPP.periodicTimer');

MCAPP.periodicTimer = (function() {
        var startProto = function() {
            if (this.timer === null)
                this.timer = setInterval(this.cb, this.interval);
        };
        var stopProto = function() {
            if (this.timer !== null) {
                clearInterval(this.timer);
                this.timer = null;
            }
        };
        var setIntervalProto = function(i) {
            this.interval = i;
            if (this.timer !== null) {
                this.stop();
                this.start();
            }
        };
    return {
        create : function(i, callback) {
            var t = {
                interval : i||300,
                cb: callback || null,
                start: startProto,
                stop: stopProto,
                timer: null,
                setInterval: setIntervalProto
            };
            return t;
        }
    };
}());
