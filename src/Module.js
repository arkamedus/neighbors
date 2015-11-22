/** @license
 * 
 * OA Integrated Engine (Module.js) — Javascript and HTML Interactive DOM & Canvas Framework
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

function Module() {
    this.registered = false;
    this.handle="##MODULE##";
}
Module.prototype.init = function(){
    return false;
}
Module.prototype.update = function(){
    return false;
}
Module.prototype.end = function(){
    return false;
}