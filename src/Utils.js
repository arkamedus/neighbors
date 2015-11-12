/** @license
 * 
 * OA Integrated Engine (Utils.js) — Javascript and HTML Interactive DOM & Canvas Framework
 * 
 * Author          :   Gordon Goodrum
 * License         :   Open Source with author attribution for non-commercial, open source projects only.
 * Contact         :   stopgordy@gmail.com
 * 
 * Copyright 2015 — Gordon Goodrum. All rights reserved.
 */



/**
 * @constructor
 */
function Keyboard() {
    
}
/**
 * @constructor
 */
function Mouse() {
    
}
Mouse.prototype.left = function(){
    return false;
}
Mouse.prototype.right = function(){
    return false;
}
Mouse.prototype.middle = function(){
    return false;
}
Mouse.prototype.scroll = function(){
    return false;
}


var bias = function (v, b) {
    return v / ((1 / b - 2) * (1 - v) + 1);
}