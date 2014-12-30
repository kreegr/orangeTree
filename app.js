var _ = require('underscore');
var fileName = 'colorTree.json';
require('./generateColorTree')(fileName, 5, 5);
require('./generateOranges')(fileName, 'oranges.json');