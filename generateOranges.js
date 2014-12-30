"use strict";

var _ = require('underscore');
var fs = require('fs');
var Colors = require('./Colors');
var path = require('path');
var tp = require('./treePath');
var getDepth = tp.getDepth;
var TREE_PATH_DELIMITER = tp.DELIMITER;
var getChildTreePath = tp.getChildTreePath;

var isColor = function isColor(node, color){
    return (node['color'] === color);
};

var queryChildren = function queryChildren(node, color, treePath){
    if (!node || !color){
        return;
    }

    var depth = getDepth(treePath);
    var results = [];
    var nodeResult;

    if (isColor(node, color)){
        // copy and extend with depth
        console.log(treePath);
        nodeResult = _.extend(_.pick(node, 'color'), {
            depth : depth,
            treePath : treePath
        });
        results.push(nodeResult);
    }

    var childResults = node.children && node.children.length ? _.chain(node.children)
        .map(function(child, index){
            var childTreePath = getChildTreePath(treePath, index);
            return queryChildren(child, color, childTreePath);
        })
        .flatten(true)
        .value() : [];


    return results.concat(childResults);
};


var generateOranges = function generateOranges(srcFileName, dstFileName){
    var filePath = path.resolve(srcFileName, '.');
    var colorTree = fs.readFileSync(filePath);
    var tree = JSON.parse(colorTree);
    var oranges = queryChildren(tree, Colors.ORANGE);
    var json = JSON.stringify(oranges, null, 4); // pretty output
    fs.writeFileSync(dstFileName, json);
    console.log('done');
};


module.exports = generateOranges;