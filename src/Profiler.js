/** @license
 * 
 * OA Integrated Engine (Profiler.js) — Javascript and HTML Interactive DOM & Canvas Framework
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
function Profiler() {
    this.size = 600; // 60 times per second = 10 seconds of logging

    this.pointer = 0;
    this.nodelist = [];
    
    this.avgs = [[1],[1],[1],[1],[1]];

    this.width = 100;
    this.height = 100;
    this.colors = ["#5498c7", "#12a185", "#9a59b5", "#bf392e", "#f1c30b"];
    this.titles = ["Kernel", "Update", "Logic", "Render", "Free"];

    this._starttime = 0;
    this._breakpoint = 0;
}
Profiler.prototype.beginFrame = function () {
    this.nodelist = []; // VERY BAD PRACTICE, although to be fair it's only 60 new arrays per second.. still though,
    this._starttime = performance.now();
};
Profiler.prototype.logBreakpoint = function () {
    this.nodelist.push(performance.now() - this._starttime);
    this._starttime = performance.now();
};
Profiler.prototype.draw = function (surface) {
    var drawpointer = 0;
    var totaltime = this.nodelist.sum();
    this.nodelist.push(((1000/60)-totaltime));
    this.width = surface._width;
    
    this.pointer = (this.pointer+1)%60;
    
    var av;

    for (var z = 0; z < 5; z++) {
        surface.context.beginPath();
        surface.context.rect(drawpointer, surface._height - 32, this.width * (this.nodelist[z] / (1000/60)), 32);
        surface.context.fillStyle = this.colors[z];
        surface.context.fill();
        
        av = this.width * ((this.avgs[z].sum()/this.avgs[z].length) / (1000/60))
        surface.context.beginPath();
        surface.context.rect(av, surface._height - 48, 3, 32);
        surface.context.fill();
        
        
        drawpointer += this.width * (this.nodelist[z] / (1000/60));
        this.avgs[z][this.pointer] = this.nodelist[z];
    }


};
