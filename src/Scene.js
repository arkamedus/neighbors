/** @license
 * 
 * OA Integrated Engine (Scene.js) — Javascript and HTML Interactive DOM & Canvas Framework
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

function Scene(options) {
    this.nodes = [];
    this.camera = new Camera();
    this.lights = [];
    //this.camera.from.set(0,50,50);
    this.handle="##SCENE##";
    this.background_color = options.background_color||"#111";
        this.sortmeta = {
        co: 0,
        sw: 0,
        index: 0,
        loop: 0,
        val: {},
        times: 0
    }
        this._tmpv = new Vec3();
}



Scene.prototype.sort = function () {

    this.sortmeta.co = 0;
    this.sortmeta.sw = 0; // ti = performance.now();

    for (this.sortmeta.index = 0; this.sortmeta.index < this.nodes.length; this.sortmeta.index++) {
        this._tmpv.copy(this.camera.from).z = 0;
        this.nodes[this.sortmeta.index].depth = this._tmpv.dist(this.nodes[this.sortmeta.index].position)+(this.nodes[this.sortmeta.index].scale.mag());
        //this._nodes[this.sortmeta.index]._lod_depth = this._tmpv.copy(this.camera.to).dist(this._nodes[this.sortmeta.index].position) * this._lod_bias;
        //dc++;
    }
    this.sortmeta.loop = true;
    this.sortmeta.times = 0;

    do {
        this.sortmeta.loop = false;

        for (var i = 0; i < this.nodes.length - (1 + this.sortmeta.times); i++) {
            //co += 1;

            if (this.nodes[i].depth < this.nodes[i + 1].depth) {
                //sw += 1;
                this.sortmeta.val = this.nodes[i];
                this.nodes[i] = this.nodes[i + 1];
                this.nodes[i + 1] = this.sortmeta.val;
                this.sortmeta.loop = true;
            }

        }
        this.sortmeta.times++;
    } while (this.sortmeta.loop);

    return this;
};
