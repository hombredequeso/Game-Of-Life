var MCAPP = MCAPP || {};

MCAPP.namespace = function (ns_string) {
    var parts = ns_string.split('.'),
        parent = MCAPP,
        i;
    if (parts[0] === "MCAPP") {
        parts = parts.slice(1);
    }
    for (i = 0; i < parts.length; i += 1) {
        // create a property if it doesn't exist
        if (typeof parent[parts[i]] === "undefined") {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    return parent;
};