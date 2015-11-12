/** @license
 * 
 * OA Integrated Engine (DB.js) — Javascript and HTML Interactive DOM & Canvas Framework
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
function DB() {
    
    /*
    
    Returns -1 on no result/error or [] if no results.
    
    */
    
    this.entries = [];
}

DB.prototype.insert = function(value){
    this.entries.push(value);
}

DB.prototype.selectWhere = function(property, value){
    return -1;
}

DB.prototype.selectArrayWhere = function(property, value){
    return [];
}