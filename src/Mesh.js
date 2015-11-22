/** @license
 * 
 * OA Integrated Engine (Mesh.js) — Javascript and HTML Interactive DOM & Canvas Framework
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
function Face3() {

    this.pos1 = new Vec3();
    this.uv1 = new Vec2();

    this.pos2 = new Vec3();
    this.uv2 = new Vec2();

    this.pos3 = new Vec3();
    this.uv3 = new Vec2();

    this.color1 = new RGB();
    this.color2 = new RGB();
    this.color3 = new RGB();

    this.center = new Vec3();
    this.normal = new Vec3();
    this._cullvec = new Vec3();
    this._dotvec = new Vec3();
    this._depth = 9999;
}

Face3.prototype.set = function (x1, y1, z1, u1, v1, x2, y2, z2, u2, v2, x3, y3, z3, u3, v3, r1, g1, b1, r2, g2, b2, r3, g3, b3) {
    this.pos1.set(x1, y1, z1);
    this.uv1.set(u1, v1);

    this.pos2.set(x2, y2, z2);
    this.uv2.set(u2, v2);

    this.pos3.set(x3, y3, z3);
    this.uv3.set(u3, v3);

    this.center.copy(this.pos1).add(this.pos2).add(this.pos3).divI(3);
    this.getnormal();

    this.color1.set(r1, g1, b1);
    this.color2.set(r2, g2, b2);
    this.color3.set(r3, g3, b3);
    return this;
}


/**
 * @type {function():Vec3} 
 */
Face3.prototype.getcenter = function () {
    return new Vec3().set((this.pos1.x + this.pos2.x + this.pos3.x) / 3, (this.pos1.y + this.pos2.y + this.pos3.y) / 3, (this.pos1.z + this.pos2.z + this.pos3.z) / 3);
};

/**
 * @type {function():Vec3} 
 */
Face3.prototype.getnormal = function () {

    var ax, ay, az, bx, by, bz, rx, ry, rz, m;

    //point0 -> point1
    ax = this.pos2.x - this.pos1.x;
    ay = this.pos2.y - this.pos1.y;
    az = this.pos2.z - this.pos1.z;

    //point0 -> point2
    bx = this.pos3.x - this.pos1.x;
    by = this.pos3.y - this.pos1.y;
    bz = this.pos3.z - this.pos1.z;

    //cross product
    rx = ay * bz - by * az;
    ry = az * bx - bz * ax,
        rz = ax * by - bx * ay;

    //magnitude
    m = Math.sqrt(rx * rx + ry * ry + rz * rz);

    //normalize
    return this.normal.set(rx / m, ry / m, rz / m);
};

/**
 * @type {function():Face3} 
 */
Face3.prototype.clone = function () {
    return new Face3().set(this.pos1.x, this.pos1.y, this.pos1.z, this.uv1.x, this.uv1.y,
        this.pos2.x, this.pos2.y, this.pos2.z, this.uv2.x, this.uv2.y,
        this.pos3.x, this.pos3.y, this.pos3.z, this.uv3.x, this.uv3.y,
        this.color1.x, this.color1.y, this.color1.z,this.color2.x, this.color2.y, this.color2.z,this.color3.x, this.color3.y, this.color3.z);
};
console.warn("function Face3().copy() is broken!");
/**
 * @type {function(Face3):Face3} 
 */
Face3.prototype.copy = function (face3) {
    this.pos1.copy(face3.pos1);
    this.pos2.copy(face3.pos2);
    this.pos3.copy(face3.pos3);
    this.color1.copy(face3.color1);
    this.color2.copy(face3.color2);
    this.color3.copy(face3.color3);
    return this;
};
/**
 * @type {function():Face3} 
 */
Face3.prototype.flipX = function () {
    //this.pos1.flipX(vec3);
    //this.pos2.flipX(vec3);
   // this.pos3.flipX(vec3);
    return this;
};
/**
 * @type {function(Vec3):Face3} 
 */
Face3.prototype.translate = function (vec3) {
    this.pos1.add(vec3);
    this.pos2.add(vec3);
    this.pos3.add(vec3);
    return this;
};
/**
 * @type {function(number):Face3} 
 */
Face3.prototype.rotX = function (rot) {
    this.pos1.rotX(rot);
    this.pos2.rotX(rot);
    this.pos3.rotX(rot);
    return this;
};
/**
 * @type {function(number):Face3} 
 */
Face3.prototype.rotY = function (rot) {
    this.pos1.rotY(rot);
    this.pos2.rotY(rot);
    this.pos3.rotY(rot);
    return this;
};
/**
 * @type {function(number):Face3} 
 */
Face3.prototype.rotZ = function (rot) {
    this.pos1.rotZ(rot);
    this.pos2.rotZ(rot);
    this.pos3.rotZ(rot);
    return this;
};
/**
 * @type {function(number):Face3} 
 */
Face3.prototype.scale = function (vec) {
    this.pos1.mul(vec);
    this.pos2.mul(vec);
    this.pos3.mul(vec);
    return this;
};

Face3.prototype.size = function(){

    var r = {},
        n = {},
        t = {};
    return r.x = this.pos2.x - this.pos1.x, r.y = this.pos2.y - this.pos1.y, r.z = this.pos2.z - this.pos1.z, n.x = this.pos3.x - this.pos1.x, n.y = this.pos3.y - this.pos1.y, n.z = this.pos3.z - this.pos1.z, t.x = r.y * n.z - r.z * n.y, t.y = r.z * n.x - r.x * n.z, t.z = r.x * n.y - r.y * n.x, .5 * Math.sqrt(t.x * t.x + t.y * t.y + t.z * t.z);
 
};


/**
 * @constructor
 */
function Mesh() {
    this._children = [];
    this._bounds = [0, 0, 0, 0, 0, 0];
    this._tmpv = new Vec3();
    this._tmpr = new Vec3();
     this.sortmeta = {
        co: 0,
        sw: 0,
        index: 0,
        loop: 0,
        val: {},
        times: 0
    }
}
Mesh.prototype.clear = function () {
    this._children = [];
    this._bounds = [0, 0, 0, 0, 0, 0];
    return this;
};
Mesh.prototype.join = function (mesh, pos) {
    //this._children = this._children.concat(mesh._children);
    var target = this;
    mesh._children.forEach(function (face) {
        target._children.push(face.clone().translate(pos));
    });
    // this._bounds = [Math.min(mesh._bounds[0],this._bounds[0]),0,0,0,0,0];
    //console.warn('Mesh.prototype.join() is incomplete!');
    return this;
};
console.warn("function Mesh().draw() should have tri._cullvec moved into mesh, not children");

Mesh.prototype.draw = function(canvas, camera, parent){
    this._children.forEach(function (tri) {
    
        camera.drawFace3(canvas, tri.pos1, tri.pos2, tri.pos3, tri.color1.toHex());
        
    });
    return this;
};

Mesh.prototype.drawUV = function(canvas, camera, parent, texture){
    this._children.forEach(function (tri) {
    
      //  tri.center=tri.getcenter().rotY(parent.rotation.y).add(parent.position)
        //if (tri._cullvec.copy(tri._dotvec.copy(tri.normal).mul(parent.scale).normalize().rotY(parent.rotation.y).rotX(parent.rotation.x).rotZ(parent.rotation.z)).dot(tri._dotvec.copy(tri.center).mul(parent.scale).rotZ(parent.rotation.z).add(parent.position).pointTo(camera.from).invert()) > 0) {
            canvas.drawFace(camera, tri,parent,texture);
       // }
        //camera.drawFace3(canvas, tri.pos1, tri.pos2, tri.pos3, tri.color1.toHex());
        
    });
    return this;
};
/*
Mesh.prototype.draw = function (camera, surface, parent) {
    //var vecFrom = new Vec3();

    if (surface._draw_outline&&!parent._static) {
        surface._context.beginPath();
        surface._context.fillStyle = "rgba(0,0,0,255)";
        this._children.forEach(function (tri) {
            //vecFrom.set(camera.from).pointTo();
            //tri._cullvec.clear().add(tri.normal).dot(tri.center.clone().add().pointTo(camera.from))
            // if (dotproduct(tri.normal(), vecFromVecs(camera.from, this._children[index].getCenter())) > 0) {
            if (tri._cullvec.copy(tri._dotvec.copy(tri.normal).mul(parent.scale).normalize().rotY(parent.rotation.y).rotX(parent.rotation.x).rotZ(parent.rotation.z)).dot(tri._dotvec.copy(tri.center).mul(parent.scale).rotY(parent.rotation.y).rotX(parent.rotation.x).rotZ(parent.rotation.z).add(parent.position).pointTo(camera.from)) > 0) {
                surface.drawFaceOutline(camera, tri, parent);
            } else {
                surface._tmp.culltris++;
            }

        });
        surface._context.fill();
    }


    this._children.forEach(function (tri) {
        //vecFrom.set(camera.from).pointTo();
        //tri._cullvec.clear().add(tri.normal).dot(tri.center.clone().add().pointTo(camera.from))
        // if (dotproduct(tri.normal(), vecFromVecs(camera.from, this._children[index].getCenter())) > 0) {
        if (tri._cullvec.copy(tri._dotvec.copy(tri.normal).mul(parent.scale).normalize().rotY(parent.rotation.y).rotX(parent.rotation.x).rotZ(parent.rotation.z)).dot(tri._dotvec.copy(tri.center).mul(parent.scale).rotZ(parent.rotation.z).add(parent.position).pointTo(camera.from).invert()) > 0) {
            surface.drawFace(camera, tri, parent);
        } else {
            surface._tmp.culltris++;
        }

    });

    return this;
};*/

Mesh.prototype.sort = function (from, parent) {
    this.sortmeta.co = 0;
    this.sortmeta.sw = 0; // ti = performance.now();

    for (this.sortmeta.index = 0; this.sortmeta.index < this._children.length; this.sortmeta.index++) {
        this._children[this.sortmeta.index]._depth = this._tmpv.copy(from).sub(parent.position).dist(this._tmpr.copy(this._children[this.sortmeta.index].center).mul(parent.scale).rotY(parent.rotation.y).rotX(parent.rotation.x).rotZ(parent.rotation.z));
        //dc++;
    }
    this.sortmeta.loop = true;
    this.sortmeta.times = 0;


    // quickSort(this._children);


    // BAD BUBBLE SORT
    //ti = performance.now();
    do {
        this.sortmeta.loop = false;

        for (var i = 0; i < this._children.length - (1 + this.sortmeta.times); i++) {
            //co += 1;

            if (this._children[i]._depth < this._children[i + 1]._depth) {
                //sw += 1;
                this.sortmeta.val = this._children[i];
                this._children[i] = this._children[i + 1];
                this._children[i + 1] = this.sortmeta.val;
                this.sortmeta.loop = true;
            }

        }
        this.sortmeta.times++;
    } while (this.sortmeta.loop);









    return this;
}


Mesh.prototype.sortQ = function (from, parent) {
    this.sortmeta.co = 0;
    this.sortmeta.sw = 0; // ti = performance.now();

    for (this.sortmeta.index = 0; this.sortmeta.index < this._children.length; this.sortmeta.index++) {
     this._children[this.sortmeta.index]._depth = this._tmpv.copy(from).dist(this._tmpr.copy(this._children[this.sortmeta.index].center));
        
       // this._children[this.sortmeta.index]._depth = this._tmpv.copy(from).dist(this._tmpr.copy(this._children[this.sortmeta.index].center).mul(parent.scale).rotY(parent.rotation.y).rotX(parent.rotation.x).rotZ(parent.rotation.z));
        //dc++;
    }
    this.sortmeta.loop = true;
    this.sortmeta.times = 0;


    // quickSort(this._children);


    // BAD BUBBLE SORT
    //ti = performance.now();
    do {
        this.sortmeta.loop = false;

        for (var i = 0; i < this._children.length - (1 + this.sortmeta.times); i++) {
            //co += 1;

            if (this._children[i]._depth < this._children[i + 1]._depth) {
                //sw += 1;
                this.sortmeta.val = this._children[i];
                this._children[i] = this._children[i + 1];
                this._children[i + 1] = this.sortmeta.val;
                this.sortmeta.loop = true;
            }

        }
        this.sortmeta.times++;
    } while (this.sortmeta.loop);









    return this;
}


Mesh.prototype.parsePLY = function (file) {
    var model = this;
    var ply = loadFile(file, function (a) {
        var properties = {
                vertices: 0,
                indeces: 0
            },
            elements = {
                vertices: [],
                indeces: []
            },
            arr = [],
            define_pos = 0, //0-headers,vertices,indeces
            read_pos = 0;


        arr = a.split('\n');

        // console.log(arr);


        for (var i = 0; i < arr.length; i++) {
            var line_arr = arr[i].split(' ');
            if (define_pos === 0) { // READING HEADER

                if (line_arr[0] === 'element') {
                    if (line_arr[1] === 'vertex') {
                        properties.vertices = parseInt(line_arr[2], 10);
                    } else if (line_arr[1] === 'face') {
                        properties.indeces = parseInt(line_arr[2], 10);
                    }
                } else if (line_arr[0] === 'end_header') {
                    define_pos = 1;
                }
            } else if (define_pos === 1) { // READING VERTICES
                if (line_arr[0]) {

                    elements.vertices.push(parseFloat(line_arr[0])); //x
                    elements.vertices.push(parseFloat(line_arr[1])); //y
                    elements.vertices.push(parseFloat(line_arr[2])); //z
                    elements.vertices.push(parseFloat(line_arr[3])); //u
                    elements.vertices.push(parseFloat(line_arr[4])); //v
                    elements.vertices.push(parseInt(line_arr[5], 10)); //r
                    elements.vertices.push(parseInt(line_arr[6], 10)); //g
                    elements.vertices.push(parseInt(line_arr[7], 10)); //b

                    model._bounds[0] = Math.min(model._bounds[0], parseFloat(line_arr[0]));
                    model._bounds[1] = Math.min(model._bounds[1], parseFloat(line_arr[1]));
                    model._bounds[2] = Math.min(model._bounds[2], parseFloat(line_arr[2]));

                    model._bounds[3] = Math.max(model._bounds[3], parseFloat(line_arr[0]));
                    model._bounds[4] = Math.max(model._bounds[4], parseFloat(line_arr[1]));
                    model._bounds[5] = Math.max(model._bounds[5], parseFloat(line_arr[2]));


                }
                properties.vertices--;
                if (properties.vertices === 0) {
                    define_pos = 2;
                }
            } else if (define_pos === 2) {
                if (line_arr[0]) {
                    elements.indeces.push(parseInt(line_arr[0], 10)); //facedefinition
                    elements.indeces.push(parseInt(line_arr[1], 10)); //v1
                    elements.indeces.push(parseInt(line_arr[2], 10)); //v2
                    elements.indeces.push(parseInt(line_arr[3], 10)); //v3
                }
                properties.indeces--;
                if (properties.indeces === 0) {
                    define_pos = 3;
                }
            }
        }

        model.name = file;


        for (var y = 0; y < elements.indeces.length; y += 4) {
            var c = 1;

            model._children.push(new Face3().set(
                elements.vertices[(elements.indeces[y + 1] * 8) + 0], //x1
                elements.vertices[(elements.indeces[y + 1] * 8) + 1], //y1
                elements.vertices[(elements.indeces[y + 1] * 8) + 2], //z1
                elements.vertices[(elements.indeces[y + 1] * 8) + 3], //u1
                1 - elements.vertices[(elements.indeces[y + 1] * 8) + 4], //v1

                elements.vertices[(elements.indeces[y + 2] * 8) + 0], //x2
                elements.vertices[(elements.indeces[y + 2] * 8) + 1], //y2
                elements.vertices[(elements.indeces[y + 2] * 8) + 2], //z2
                elements.vertices[(elements.indeces[y + 2] * 8) + 3], //u2
                1 - elements.vertices[(elements.indeces[y + 2] * 8) + 4], //v2

                elements.vertices[(elements.indeces[y + 3] * 8) + 0], //x3
                elements.vertices[(elements.indeces[y + 3] * 8) + 1], //y3
                elements.vertices[(elements.indeces[y + 3] * 8) + 2], //z3
                elements.vertices[(elements.indeces[y + 3] * 8) + 3], //u3
                1 - elements.vertices[(elements.indeces[y + 3] * 8) + 4], //v3

                Math.floor(elements.vertices[(elements.indeces[y + 1] * 8) + 5]), //r1
                Math.floor(elements.vertices[(elements.indeces[y + 1] * 8) + 6]), //g1
                Math.floor(elements.vertices[(elements.indeces[y + 1] * 8) + 7]), //b1
                
                 Math.floor(elements.vertices[(elements.indeces[y + 2] * 8) + 5]), //r2
                Math.floor(elements.vertices[(elements.indeces[y + 2] * 8) + 6]), //g2
                Math.floor(elements.vertices[(elements.indeces[y + 2] * 8) + 7]), //b2
                
                 Math.floor(elements.vertices[(elements.indeces[y + 3] * 8) + 5]), //r3
                Math.floor(elements.vertices[(elements.indeces[y + 3] * 8) + 6]), //g3
                Math.floor(elements.vertices[(elements.indeces[y + 3] * 8) + 7]) //b3

            ));

        }









        console.log(model);
        //model._mesh_id = ModelManager._children.length;
        //ModelManager._children.push(model);

    });


    return this;
};
