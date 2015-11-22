Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)];
};

Array.prototype.sum = function () {
    var sum = 0;
    for (var a=0; a<this.length; a++){
        sum += this[a];
    }
    return sum;
};
