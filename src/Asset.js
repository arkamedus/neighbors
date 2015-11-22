/** @license
 * 
 * OA Integrated Engine (Asset.js) — Javascript and HTML Interactive DOM & Canvas Framework
 * 
 * Author          :   Gordon Goodrum
 * License         :   Open Source with author attribution for non-commercial, open source projects only.
 * Contact         :   stopgordy@gmail.com
 * 
 * Copyright 2015 — Gordon Goodrum. All rights reserved.
 */

function loadSprite(src){
    var i;
    i = new Image();
    i.ready = false;
    i.src=src;
    i.origin = (new Vec2())
    
    i.onload=function(){
     i.ready = true;   
    }
    
    return i;
}

function loadFile(src, func) {
        //AssetManager.total_items++;

        var xmlhttp = new XMLHttpRequest();
        xmlhttp._loaded = false;
        xmlhttp.onreadystatechange = function () {
            //console.log(xmlhttp);
            if (!xmlhttp._loaded && xmlhttp.readyState === 4 && (xmlhttp.status === 200 || xmlhttp.responseText)) {
                func(xmlhttp.responseText);
                //AssetManager.loaded_items++;
                //console.log('loaded!');
                xmlhttp._loaded = true;
            }
        };
        xmlhttp.open("GET", src, true);
        xmlhttp.send();
    }


var sp_cross = loadSprite('../common/icon/cross_w.png');sp_cross.origin.set(16,16);

var sp_shadow = loadSprite('../common/sprite/sp_shadow.png');sp_shadow.origin.set(32,32);


var sp_tileflower = loadSprite('../common/sprite/sp_tilegrass04.png');sp_tileflower.origin.set(64,64);

var sp_wolf = loadSprite('../common/sprite/sp_npc_wolf.png');sp_wolf.origin.set(64,128);
var sp_goblin = loadSprite('../common/sprite/sp_npc04.png');sp_goblin.origin.set(64,128);
var sp_chicken = loadSprite('../common/sprite/sp_npc03.png');sp_chicken.origin.set(64,128);

var sp_cloud = loadSprite('../common/sprite/sp_cloud01.png');sp_cloud.origin.set(256,256);


var sp_floor_grass = loadSprite('../common/sprite/sp_floor01.png');sp_floor_grass.origin.set(512,512);
var sp_cobble = loadSprite('../common/sprite/sp_cobble03.png');sp_cobble.origin.set(512,512);
var sp_floor_swamp = loadSprite('../common/sprite/sp_floor02.png');sp_floor_swamp.origin.set(512,512);
var sp_floor_dirt = loadSprite('../common/sprite/sp_floor03.png');sp_floor_dirt.origin.set(512,512);
var sp_floor_sand = loadSprite('../common/sprite/sp_floor07.png');sp_floor_sand.origin.set(512,512);
var sp_floor_water = loadSprite('../common/sprite/sp_floor08.png');sp_floor_water.origin.set(512,512);

var sp_huge= loadSprite('../common/texture/huge.png');//sp_shadow.origin.set(32,32);

var sp_shelf= loadSprite('../common/sprite/sp_shelf01.png');//sp_shadow.origin.set(32,32);

var sp_lightmap_sewersdoor = loadSprite('../common/texture/lightmap_sewersdoor.png');//sp_floor_grass.origin.set(512,512);

var sp_rock = loadSprite('../common/sprite/sp_rock01.png');sp_rock.origin.set(128,256);

var sp_tree = loadSprite('../common/sprite/sp_tree01.png');sp_tree.origin.set(256,1024);

var sp_bush = loadSprite('../common/sprite/sp_bush01.png');sp_bush.origin.set(32,64);

var sp_tallgrass = loadSprite('../common/sprite/sp_tallgrass01.png');sp_tallgrass.origin.set(32,64);

var sp_mountain = loadSprite('../common/sprite/sp_mountain01.png');sp_mountain.origin.set(512,512);

var sp_hills = loadSprite('../common/sprite/sp_hills01.png');sp_hills.origin.set(512,128);


var me_grasstuft = (new Mesh()).parsePLY('../common/mesh/grasstuft01_sd.ply');

var me_plane = (new Mesh()).parsePLY('../common/mesh/plane01_sd.ply');


var me_tree01 = (new Mesh()).parsePLY('../common/mesh/sewer01_sd.ply');


var me_chest01 = (new Mesh()).parsePLY('../common/mesh/chest01_sd.ply');