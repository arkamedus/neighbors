/** @license
 * 
 * OA Integrated Engine (Colors.js) — Javascript and HTML Interactive DOM & Canvas Framework
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
function RGB() {
    this.r = 0;
    this.g = 0;
    this.b = 0;
}
RGB.prototype.set = function (r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
    return this;
}
RGB.prototype.copy = function (rgb) {
    this.r = rgb.r;
    this.g = rgb.g;
    this.b = rgb.b;
    return this;
}
// Thanks to @cwolves on Stack Exchange
// http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
RGB.prototype.toHex = function () {
    return "#" + ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1);
}
/**
 * @constructor
 */
function RGBA() {
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = 1;
}
RGBA.prototype.set = function (r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
    return this;
}
RGBA.prototype.copy = function (rgba) {
    this.r = rgba.r;
    this.g = rgba.g;
    this.b = rgba.b;
    this.a = rgba.a;
    return this;
}
