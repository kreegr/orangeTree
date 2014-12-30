"use strict";

/**
 * @param {String} color
 * @param {ColorNode[]} children
 * @returns {{color: *, children: (*|Array)}}
 * @constructor
 */
var ColorNode = function ColorNode(color, children){
    var result = {
        color : color
    };

    if (children) {
        result.children = children;
    }


    return result;
};

module.exports = ColorNode;