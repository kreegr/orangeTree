"use strict";

var _ = require('underscore');
var fs = require('fs');
var Colors = require('./Colors');
var COLORS = _.values(Colors);
var ColorNode = require('./ColorNode');

var tp = require('./treePath');
var TREE_PATH_DELIMITER = tp.DELIMITER;
var getDepth = tp.getDepth;
var getChildTreePath = tp.getChildTreePath;

var DEFAULTS = {
    MAX_CHILDREN : 20,
    MAX_DEPTH : 10,
    DEPTH : 0,
    DST_FILENAME : 'colorTree.json'
};


var generateNodes = function generateNodes(maxDepth, maxChildren, treePath){
    maxDepth = !_.isUndefined(maxDepth) ? maxDepth : DEFAULTS.MAX_DEPTH;
    maxChildren = !_.isUndefined(maxChildren) ? maxChildren : DEFAULTS.MAX_CHILDREN;
    var depth = getDepth(treePath);

    console.log('generating node %s', treePath);

    var colorIndex = _.random(0, COLORS.length-1);
    var color = COLORS[colorIndex];
    var numChildren = (depth < maxDepth) ? _.random(0, maxChildren) : 0;
    var children = _.times(numChildren, function(index){
        var childTreePath = getChildTreePath(treePath, index);
        return generateNodes(maxDepth, maxChildren, childTreePath);
    });

    console.log('generating tree for node: %s at depth: %s with %s children', treePath, depth, numChildren);


    return new ColorNode(color, children);
};


var generateJSON = function generateJSON(fileName, maxDepth, maxChildren){
    var tree = generateNodes(maxDepth, maxChildren);
    var json = JSON.stringify(tree, null, 4); // pretty output
    fileName = fileName || DEFAULTS.DST_FILENAME;
    fs.writeFileSync(fileName, json);

    console.log('wrote file %s', fileName);
};


module.exports = generateJSON;
