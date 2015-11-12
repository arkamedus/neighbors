/** @license
 * 
 * OA Integrated Engine (Vector3.js) — Javascript and HTML Interactive DOM & Canvas Framework
 * 
 * Author          :   Gordon Goodrum
 * License         :   Open Source with author attribution for non-commercial, open source projects only.
 * Contact         :   stopgordy@gmail.com
 * 
 * Copyright 2015 — Gordon Goodrum. All rights reserved.
 */

 //TEMP VECTOR3 CACHE
var Vec3_TempI = 0,
    Vec3_TempV = new Vec3();
 
/**
 * @constructor
 */
function Vec3() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    return this;
};
/** @type {function():Vec3} */
Vec3.prototype.clear = function () {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    return this;
};
/** @type {function(number,number,number):Vec3} */
Vec3.prototype.set = function (x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
};
/** @type {function(Vec3):Vec3} */
Vec3.prototype.add = function (vec3) {
    this.x += vec3.x;
    this.y += vec3.y;
    this.z += vec3.z;
    return this;
};
/** @type {function(Vec3):Vec3} */
Vec3.prototype.sub = function (vec3) {
    this.x -= vec3.x;
    this.y -= vec3.y;
    this.z -= vec3.z;
    return this;
};
/** @type {function(Vec3):Vec3} */
Vec3.prototype.mul = function (vec3) {
    this.x *= vec3.x;
    this.y *= vec3.y;
    this.z *= vec3.z;
    return this;
};
/** @type {function(Vec3):Vec3} */
Vec3.prototype.div = function (vec3) {
    this.x /= vec3.x;
    this.y /= vec3.y;
    this.z /= vec3.z;
    return this;
};
/** @type {function(number):Vec3} */
Vec3.prototype.mulI = function (a) {
    this.x *= a;
    this.y *= a;
    this.z *= a;
    return this;
};
/** @type {function(number):Vec3} */
Vec3.prototype.divI = function (a) {
    this.x /= a;
    this.y /= a;
    this.z /= a;
    return this;
};
Vec3.prototype.random=function(){
     this.x = Math.random();
    this.y = Math.random();
    this.z = Math.random();
    return this;
};


console.warn('Function Vec3.rotations should be converted to radians, not degrees');
/** @type {function(number):Vec3} */
Vec3.prototype.rotX = function (deg) {
   // deg *= (Math.PI / 180);
    //var b = new Vec3().set((this.x * Math.cos(a) - this.y * Math.sin(a)), (this.x * Math.sin(a) + this.y * Math.cos(a)), this.z);
    Vec3_TempV.y = (this.y * Math.cos(deg) - this.z * Math.sin(deg));
    Vec3_TempV.z = (this.y * Math.sin(deg) + this.z * Math.cos(deg));
    this.y = Vec3_TempV.y;
    this.z = Vec3_TempV.z;
    return this;
};

/** @type {function(number):Vec3} */
Vec3.prototype.rotY = function (deg) {
    //deg *= (Math.PI / 180);
    //var b = new Vec3().set((this.x * Math.cos(a) - this.y * Math.sin(a)), (this.x * Math.sin(a) + this.y * Math.cos(a)), this.z);
    Vec3_TempV.x = (this.x * Math.cos(deg) - this.z * Math.sin(deg));
    Vec3_TempV.z = (this.x * Math.sin(deg) + this.z * Math.cos(deg));
    this.x = Vec3_TempV.x;
    this.z = Vec3_TempV.z;
    return this;
};

/** @type {function(number):Vec3} */
Vec3.prototype.rotZ = function (deg) {
    //deg *= (Math.PI / 180);
    //var b = new Vec3().set((this.x * Math.cos(a) - this.y * Math.sin(a)), (this.x * Math.sin(a) + this.y * Math.cos(a)), this.z);
    Vec3_TempV.x = (this.x * Math.cos(deg) - this.y * Math.sin(deg));
    Vec3_TempV.y = (this.x * Math.sin(deg) + this.y * Math.cos(deg));
    this.x = Vec3_TempV.x;
    this.y = Vec3_TempV.y;
    return this;
};

/** @type {function():Vec3} */
Vec3.prototype.flipX = function () {
    this.x*=-1;
    return this;
};


/** @type {function(Vec3):number} */
Vec3.prototype.dot = function (a) {
    return (this.x * a.x + this.y * a.y + this.z * a.z);
};
/** @type {function(Vec3):Vec3} */
Vec3.prototype.copy = function (a) {
    this.x = a.x;
    this.y = a.y;
    this.z = a.z;
    return this;
};
/** @type {function(Vec3):Vec3} */
Vec3.prototype.pointTo = function (vec) {
    //var a = this.clone();
    // a.sub(vec).divI(a.dist(vec));
    // var d = this.dist(vec);
    this.sub(vec).normalize();
    return this;
    // return a;
};
/** @type {function(Vec3):number} */
Vec3.prototype.dist = function (vec) {
    return Math.sqrt((this.x - vec.x) * (this.x - vec.x) + (this.y - vec.y) * (this.y - vec.y) + (this.z - vec.z) * (this.z - vec.z));
    // return Math.sqrt(Math.pow((this.x - vec.x), 2) + Math.pow((this.y - vec.y), 2) + Math.pow((this.z - vec.z), 2));
};
/** @type {function():number} */
Vec3.prototype.mag = function () {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
};
/** @type {function():Vec3} */
Vec3.prototype.normalize = function () {
    Vec3_TempI = this.mag();
    this.x /= Vec3_TempI;
    this.y /= Vec3_TempI;
    this.z /= Vec3_TempI;
    return this;
};
/** @type {function():Vec3} */
Vec3.prototype.clone = function () {
    return (new Vec3().set(this.x, this.y, this.z));
};
/** @type {function():Vec3} */
Vec3.prototype.invert = function () {
    this.x *= -1;
    this.y *= -1;
    this.z *= -1;
    return this;
};