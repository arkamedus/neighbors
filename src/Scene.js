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
}

