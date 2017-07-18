const _ = require('lodash');
const distros = require('./utils/distributions.js');

exports.convolve = function(kernel, stream) {
  return [];
}

exports.findLocalMaxima = function(stream,kernel) {
  return [];
}

function doSmoothing() {
  const fs = require('fs');
  const path = require('path');
  const kernel = distros.gaussian(13,1.5);
  //console.log(kernel)
  let streams = require('./data/streams.json')
    .map(stream => _.zip.apply(_,_.times(stream[0].length).map(channel => exports.convolve(kernel,_.map(stream,''+channel)))))
  fs.writeFileSync(path.join(__dirname,'./data/smoothed.json'),JSON.stringify(streams));
}

//doSmoothing();

