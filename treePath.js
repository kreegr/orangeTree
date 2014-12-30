"use strict";

var _ = require('underscore');

var DEFAULT_TREE_PATH = '0';
var DELIMITER = '-';

/**
 * Calc's depth based on the treePath
 * @param {String} treePath
 * @return {Number} depth
 */
var getDepth = function getDepth(treePath){
    var depth = _.isUndefined(treePath) ? 1 : treePath.split(DELIMITER)
        .length;


    return depth;
};

/**
 * Constructs a tree path for a child node
 * @param {String} parentTreePath
 * @param {Number} childIndex
 * @returns {string}
 */
var getChildTreePath = function getChildTreePath(parentTreePath, childIndex){
    parentTreePath = _.isUndefined(parentTreePath) ? DEFAULT_TREE_PATH : parentTreePath;
    var treePath = [
        parentTreePath,
        childIndex
    ].join(DELIMITER);


    return treePath;
};

module.exports = {
    getDepth : getDepth,
    getChildTreePath : getChildTreePath,
    DELIMITER : DELIMITER
};

