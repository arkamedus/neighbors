/** @license
 * 
 * OA Integrated Engine (Actor.js) — Javascript and HTML Interactive DOM & Canvas Framework
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

function Actor() {
    this.nodes = [];
    this.position = new Vec3();
    this.rotation = new Vec3();
    this.scale = (new Vec3()).set(1,1,1);
    this.path = new Vec3();
    this.velocity = new Vec3();
    this.sprite = null;
    this.dynamic = true;
    this.mesh = null;
    return this;
}

Actor.prototype.setSprite = function (sprite) {
    this.sprite = sprite;
    return this;
}
Actor.prototype.update=function(){
    if (!this.dynamic){
    return false;
    }
    
    if (Math.random()*400<1.1){
     this.path.set((Math.random() * 20)-10,(Math.random() * 20)-10,0);
        this.velocity.copy(this.position).sub(this.path).normalize().invert();
    }
    if (this.velocity.mag()>0.001){
    this.velocity.divI(0.82);
    this.position.add(this.velocity.normalize().divI(16));
    }
};

Actor.prototype.getMesh=function(){
    return this.mesh;  
};