/** @license
 * 
 * OA Integrated Engine (SurfaceGL.js) — Javascript and HTML Interactive DOM & Canvas Framework
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
function SurfaceGL() {

    //this._gl = null;
    this._element = document.createElement('canvas');
    this._element.style.position = 'fixed';
    this._gl = this._element.getContext('experimental-webgl');

    this._width = 128;
    this._height = 128;

    this._children = [];

    this._buffer = {
        vertices: [],
        colors: [],
        uvs: []
    };

    this._render_buffer = {
        vertices: null, //gl.createBuffer(),
        colors: null, //gl.createBuffer()
        uvs: null
    };

    //this.camera = {
    //     from: [0, 20, 10],
    //    to: [0, 0, 0],
    //    up: [0, 1, 0]
    //};

    this._matrix = {
        model_view: mat4.create(),
        projection: mat4.create()
    };

    this._textures = [];

    this._shader = null;

    return this;
};

SurfaceGL.prototype.attach= function (x,y) {
        document.body.appendChild(this._element);
        this._element.style.position = "fixed";
        this._element.style.left =x+"px";
        this._element.style.top =y+"px";
        return this;
    };
SurfaceGL.prototype.resize= function (width, height) {
        this._element.width = width;
        this._element.height = height;
        this._width = width;
        this._height = height;
         this._gl.viewportWidth = width;
         this._gl.viewportWidth = height;
        return this;
    };



//Kernel.SurfaceGL._load_texture('asset/texture/huge.png');




    var gl;
    function initGL(canvas) {
        try {
            gl = canvas._gl;//getContext("experimental-webgl");
            gl.viewportWidth = canvas.width;
            gl.viewportHeight = canvas.height;
        } catch (e) {
        }
        if (!gl) {
            alert("Could not initialise WebGL, sorry :-(");
        }
    }


    function getShader(gl, id) {
        var shaderScript = document.getElementById(id);
        if (!shaderScript) {
            return null;
        }

        var str = "";
        var k = shaderScript.firstChild;
        while (k) {
            if (k.nodeType == 3) {
                str += k.textContent;
            }
            k = k.nextSibling;
        }

        var shader;
        if (shaderScript.type == "x-shader/x-fragment") {
            shader = gl.createShader(gl.FRAGMENT_SHADER);
        } else if (shaderScript.type == "x-shader/x-vertex") {
            shader = gl.createShader(gl.VERTEX_SHADER);
        } else {
            return null;
        }

        gl.shaderSource(shader, str);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert(gl.getShaderInfoLog(shader));
            return null;
        }

        return shader;
    }


    var shaderProgram;

    function initShaders() {
        var fragmentShader = getShader(gl, "shader-fs");
        var vertexShader = getShader(gl, "shader-vs");

        shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);

        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }

        gl.useProgram(shaderProgram);

        shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

        shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
        shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    }


    var mvMatrix = mat4.create();
    var pMatrix = mat4.create();

    function setMatrixUniforms() {
        gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
        gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
    }



    var triangleVertexPositionBuffer;
    var squareVertexPositionBuffer;

    function initBuffers() {
        triangleVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
        var vertices = [
             0.0,  1.0,  0.0,
            -1.0, -1.0,  0.0,
             1.0, -1.0,  0.0
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        triangleVertexPositionBuffer.itemSize = 3;
        triangleVertexPositionBuffer.numItems = 3;

        squareVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
        vertices = [
             1.0,  1.0,  0.0,
            -1.0,  1.0,  0.0,
             1.0, -1.0,  0.0,
            -1.0, -1.0,  0.0
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        squareVertexPositionBuffer.itemSize = 3;
        squareVertexPositionBuffer.numItems = 4;
    }


    function drawScene() {
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);

        mat4.identity(mvMatrix);

        mat4.translate(mvMatrix, [-1.5, 0, 0.0]);
        gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, triangleVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
        setMatrixUniforms();
        gl.drawArrays(gl.TRIANGLES, 0, triangleVertexPositionBuffer.numItems);


        mat4.translate(mvMatrix, [3.0, 0.0, 0.0]);
        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, squareVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
        setMatrixUniforms();
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, squareVertexPositionBuffer.numItems);
        //console.log();
    }



    function webGLStart(surface) {
       // var canvas = Kernel.SurfaceGL._element;
        initGL(surface);
        initShaders();
        initBuffers();

        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);

        drawScene();
    }





//webGLStart();



/*
SurfaceGL.prototype = {

    _init: function () {
        //this._gl = gl;

        this.getShader = function (gl, id) {
            var shaderScript = document.getElementById(id);
            if (!shaderScript) {
                return null;
            }

            var str = "";
            var k = shaderScript.firstChild;
            while (k) {
                if (k.nodeType == 3) {
                    str += k.textContent;
                }
                k = k.nextSibling;
            }

            var shader;
            if (shaderScript.type == "x-shader/x-fragment") {
                shader = gl.createShader(gl.FRAGMENT_SHADER);
            } else if (shaderScript.type == "x-shader/x-vertex") {
                shader = gl.createShader(gl.VERTEX_SHADER);
            } else {
                return null;
            }

            gl.shaderSource(shader, str);
            gl.compileShader(shader);

            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                alert(gl.getShaderInfoLog(shader));
                return null;
            }

            return shader;
        };


        var fragmentShader = this.getShader(this._gl, "shader-fs");
        var vertexShader = this.getShader(this._gl, "shader-vs");

        this._shader = this._gl.createProgram();
        this._gl.attachShader(this._shader, vertexShader);
        this._gl.attachShader(this._shader, fragmentShader);
        this._gl.linkProgram(this._shader);

        if (!this._gl.getProgramParameter(this._shader, this._gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }

        this._gl.useProgram(this._shader);

        this._shader.vertexPositionAttribute = this._gl.getAttribLocation(this._shader, "aVertexPosition");
        this._gl.enableVertexAttribArray(this._shader.vertexPositionAttribute);

        this._shader.vertexColorAttribute = this._gl.getAttribLocation(this._shader, "aVertexColor");
        this._gl.enableVertexAttribArray(this._shader.vertexColorAttribute);

        this._shader.textureCoordAttribute = this._gl.getAttribLocation(this._shader, "aTextureCoord");
        this._gl.enableVertexAttribArray(this._shader.textureCoordAttribute);

        this._shader.pMatrixUniform = this._gl.getUniformLocation(this._shader, "uPMatrix");
        this._shader.mvMatrixUniform = this._gl.getUniformLocation(this._shader, "uMVMatrix");
        this._shader.samplerUniform = this._gl.getUniformLocation(this._shader, "uSampler");

        this._gl.clearColor(1.0, 0.0, 0.0, 1.0);
        this._gl.enable(this._gl.DEPTH_TEST);


        console.log('SurfaceGL initialized!');

        return this;
    },

    attach: function (x,y) {
        document.body.appendChild(this._element);
        this._element.style.position = "fixed";
        this._element.style.left =x+"px";
        this._element.style.top =y+"px";
        return this;
    },
    resize: function (width, height) {
        this._element.width = width;
        this._element.height = height;
        this._width = width;
        this._height = height;
        // this._gl.viewportWidth = width;
        // this._gl.viewportWidth = height;
        return this;
    },

    _logic: function () {

    },

    _buffer_clear: function () {
        this._buffer = {
            vertices: [],
            colors: [],
            uvs: []
        };
        this._render_buffer = {
            vertices: this._gl.createBuffer(),
            colors: this._gl.createBuffer(),
            uvs: this._gl.createBuffer()
        };

        return this;
    },

    _load_texture: function (texture) {
        var scene = this;
        var tex = this._gl.createTexture();
        tex.image = new Image();
        tex.image.src = texture;
        tex.image.onload = function () {
            scene._gl.bindTexture(scene._gl.TEXTURE_2D, tex);
            scene._gl.pixelStorei(scene._gl.UNPACK_FLIP_Y_WEBGL, true);
            scene._gl.texImage2D(scene._gl.TEXTURE_2D, 0, scene._gl.RGBA, scene._gl.RGBA, scene._gl.UNSIGNED_BYTE, tex.image);
            scene._gl.texParameteri(scene._gl.TEXTURE_2D, scene._gl.TEXTURE_MAG_FILTER, scene._gl.NEAREST);
            scene._gl.texParameteri(scene._gl.TEXTURE_2D, scene._gl.TEXTURE_MIN_FILTER, scene._gl.NEAREST);
            scene._gl.bindTexture(scene._gl.TEXTURE_2D, null);
        }

        this._textures.push(tex);
        return tex;
    },

    _buffer_mesh: function (mesh) {

        for (var i = 0; i < mesh._children.length; i++) {
            this._buffer.vertices.push(mesh._children[i].pos1.x);
            this._buffer.vertices.push(mesh._children[i].pos1.y);
            this._buffer.vertices.push(mesh._children[i].pos1.z);

            this._buffer.vertices.push(mesh._children[i].pos2.x);
            this._buffer.vertices.push(mesh._children[i].pos2.y);
            this._buffer.vertices.push(mesh._children[i].pos2.z);

            this._buffer.vertices.push(mesh._children[i].pos3.x);
            this._buffer.vertices.push(mesh._children[i].pos3.y);
            this._buffer.vertices.push(mesh._children[i].pos3.z);

            this._buffer.uvs.push(mesh._children[i].uv1.x);
            this._buffer.uvs.push(mesh._children[i].uv1.y);

            this._buffer.uvs.push(mesh._children[i].uv2.x);
            this._buffer.uvs.push(mesh._children[i].uv2.y);

            this._buffer.uvs.push(mesh._children[i].uv3.x);
            this._buffer.uvs.push(mesh._children[i].uv3.y);

            this._buffer.colors.push(mesh._children[i].color1.x / 255);
            this._buffer.colors.push(mesh._children[i].color1.y / 255);
            this._buffer.colors.push(mesh._children[i].color1.z / 255);
            this._buffer.colors.push(1);
            this._buffer.colors.push(mesh._children[i].color2.x / 255);
            this._buffer.colors.push(mesh._children[i].color2.y / 255);
            this._buffer.colors.push(mesh._children[i].color2.z / 255);
            this._buffer.colors.push(1);
            this._buffer.colors.push(mesh._children[i].color3.x / 255);
            this._buffer.colors.push(mesh._children[i].color3.y / 255);
            this._buffer.colors.push(mesh._children[i].color3.z / 255);
            this._buffer.colors.push(1);
        }

        return this;
    },




    _render: function (camera) {
        if (!this._gl) {
            console.error('SurfaceGL._gl not bound to WebGLRenderingContext');
            return false;
        } else if (!this._shader) {
            console.error('SurfaceGL._shader not bound to Shader');
            return false;
        }
        //console.log('GL RENDER CALLED',this._children);

        this._gl.viewport(0, 0, this._gl.viewportWidth, this._gl.viewportHeight);
        this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);

        mat4.perspective(45, this._gl.viewportWidth / this._gl.viewportHeight, 0.1, 1000.0, this._matrix.projection);

        //var camera_quat = quat4.create();
//onsole.log(this._buffer);
        //this._buffer_clear();
        var scene = this;
        //this._children.forEach(function (child) {
            //if (child.mesh) {
                //console.log('rendering mesh');
                //scene._buffer_clear();
               // scene._buffer_mesh(child.getMesh());
               // console.log(scene._buffer.colors);

                scene._gl.bindBuffer(scene._gl.ARRAY_BUFFER, scene._render_buffer.vertices);
                scene._gl.bufferData(scene._gl.ARRAY_BUFFER, new Float32Array(scene._buffer.vertices), scene._gl.STATIC_DRAW);

                scene._gl.bindBuffer(scene._gl.ARRAY_BUFFER, scene._render_buffer.colors);
                scene._gl.bufferData(scene._gl.ARRAY_BUFFER, new Float32Array(scene._buffer.colors), scene._gl.STATIC_DRAW);

                scene._gl.bindBuffer(scene._gl.ARRAY_BUFFER, scene._render_buffer.uvs);
                scene._gl.bufferData(scene._gl.ARRAY_BUFFER, new Float32Array(scene._buffer.uvs), scene._gl.STATIC_DRAW);

                // console.log(new Float32Array(scene._buffer.vertices));

                mat4.identity(scene._matrix.model_view);
                //mat4.rotateZ(scene._matrix.model_view, Kernel._ticks);

                mat4.translate(scene._matrix.model_view, [0, -100, 0]);
                // mat4.lookAt([camera.from.x, -camera.from.z, -camera.from.y], [camera.to.x, -camera.to.z, -camera.to.y], [camera.up.x, -camera.up.y, -camera.up.z], scene._matrix.model_view);

                //   mat4.translate(scene._matrix.model_view, [camera.from.x, -camera.from.z, -camera.from.y]);
                //mat4.lookAt([camera.from.x, -camera.from.z, -camera.from.y], [camera.to.x, -camera.to.z, -camera.to.y], [camera.up.x, -camera.up.y, -camera.up.z], scene._matrix.model_view);

                
                                mat4.translate(scene._matrix.model_view, [camera.from.x, -camera.from.z, -camera.from.y]); //camera position
                                mat4.lookAt([camera.from.x, -camera.from.z, -camera.from.y], [camera.to.x, -camera.to.z, -camera.to.y], [camera.up.x, -camera.up.y, -camera.up.z], scene._matrix.model_view);


                                mat4.translate(scene._matrix.model_view, [child.position.x, -child.position.z, -child.position.y]);
                                
                                mat4.scale(scene._matrix.model_view, [child.scale.x, child.scale.z, child.scale.y]);
                                
                mat4.rotateY(scene._matrix.model_view,child.rotation.z);

                scene._gl.bindBuffer(scene._gl.ARRAY_BUFFER, scene._render_buffer.vertices);
                scene._gl.vertexAttribPointer(scene._shader.vertexPositionAttribute, 3  x,y,z  , scene._gl.FLOAT, false, 0, 0);


                scene._gl.bindBuffer(scene._gl.ARRAY_BUFFER, scene._render_buffer.colors);
                scene._gl.vertexAttribPointer(scene._shader.vertexColorAttribute, 4  r,g,b,a  , scene._gl.FLOAT, false, 0, 0);

               scene._gl.bindBuffer(scene._gl.ARRAY_BUFFER, scene._render_buffer.uvs);
                scene._gl.vertexAttribPointer(scene._shader.textureCoordAttribute, 2, scene._gl.FLOAT, false, 0, 0);



                //console.log(scene._textures[0]);

                scene._gl.uniformMatrix4fv(scene._shader.pMatrixUniform, false, scene._matrix.projection);
                scene._gl.uniformMatrix4fv(scene._shader.mvMatrixUniform, false, scene._matrix.model_view);
                scene._gl.activeTexture(scene._gl.TEXTURE0);
                scene._gl.bindTexture(scene._gl.TEXTURE_2D, scene._textures[0]);
                scene._gl.uniform1i(scene._shader.samplerUniform, 0);

                scene._gl.drawArrays(scene._gl.TRIANGLES, 0, (scene._render_buffer.vertices.length / 3) | 0);
            //}
        //);


    }






};*/



/*
function SurfaceGL() {
    this.nodes = 0;
    this.element = document.createElement('canvas');
    this.context = this.element.getContext('webgl');
    this._width = 500;
    this._height = 500;
//document.body.appendChild(this.context);
    return this;
}

SurfaceGL.prototype.resize = function (width, height) {
    this.element.width= width;this._width=width;this.context.viewportWidth = width;

    this.element.height = height;this._height=height;this.context.viewportHeight = height;
    return this;
}


SurfaceGL.prototype.attach = function (x, y) {
    //console.log(this.element);
    document.body.appendChild(this.element);
    this.element.style.position = "fixed";
    this.element.style.left = x + "px";
    this.element.style.top = y + "px";
    return this;
}

SurfaceGL.prototype.fill = function (col) {
    //this.context.beginPath();
    //this.context.fillStyle = col;
    //this.context.rect(0, 0, this._width, this._height);
    //this.context.fill();
    return this;
}
*/