const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const _ = require('lodash');
const path = require('path');

/// base - A path to a file in a filesystem
/// rules - An array of rules. If the rule begins with an ^, it is an exclusion rule
exports.traverseSync = function (base, rules) {
  let files = fs.readdirSync(base);
  return _(files).map( file => {
    let full = path.join(base,file);
    let stat = fs.statSync(full);
    if(stat.isDirectory()) return []
    return full.substring(base.length);
  }).flatten().value();
  return files;
}

exports.traverseAsync = function (base, rules) {
  return Promise.reject('Not yet implemented');
}

exports.traverse = function (base, rules, callback) {
  callback('Not yet implemented')
}
