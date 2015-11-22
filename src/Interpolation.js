function lerp(a,b,amt){
    return (a + amt*(b - a));
};


function gain(value, amt){
    var p = (1 / amt - 2) * (1 - 2 * value);
    if (value < 0.5) {return value / (p + 1);}
    else { return (p - value) / (p - 1);}
}