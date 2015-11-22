/** @license
 * 
 * OA Integrated Engine (Kernel.js) — Javascript and HTML Interactive DOM & Canvas Framework
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
function Kernel(options) {

    /* options
    
    fps: 0-60 (Default 60)
    debug: true/false (Default false)
    
    */


    this.loop = 0;
    this.ticks = 0;
    this.fps = options.fps || 60;
    this.debug = options.debug || false;

    this.modules = [];

    this.tmp = {
        a: 0,
        b: 0,
        c: 0,
        d: 0,
        e: 0
    };

};

Kernel.prototype.init = function () {
    console.log("Kernel.init() invoked");

    if (!this.loop) {
        var that = this;
        this.loop = window.setInterval(function () {
            that.ticks++;
            that.update();
            for (that.tmp.a = 0; that.tmp.a < that.modules.length; that.tmp.a++) {
                that.modules[that.tmp.a].update();
            }


            Mouse.buttonPressed[0] = false;
            Mouse.buttonPressed[1] = false;
            Mouse.buttonPressed[2] = false;

            for (var u = 0; u < 255; u += 1) {
                //Key[u] = false;
                KeyPressed[u] = false;
                KeyReleased[u] = false;
            }
            
            Mouse.pos_last.copy(Mouse.pos);

        }, (1000 / that.fps) | 0)
    }

    console.log("Kernel.init() complete");
}

Kernel.prototype.update = function () {
    debug.beginFrame();

    debug.logBreakpoint();
    debug.logBreakpoint();
}

Kernel.prototype.end = function () {
    console.log("Kernel.end() invoked");
}

Kernel.prototype.clean = function () {
    console.log("Kernel.clean() invoked");
}

Kernel.prototype.registerModule = function (m) {

    if (m.registered) {

        console.log("Kernel.registerModule() invoked");
        console.warn("Module " + m.handle + " already registered");
    } else {
        this.modules.push(m);
        m.registered = true;
        m.init();
        console.log("Kernel.registerModule() invoked");
    }
}
