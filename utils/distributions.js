const _ = require('lodash');

// Generates a uniform distribution kernel of width size
exports.uniform = function (width) {
  return _.times(width).map(x => x/width);
}

// Generates a gaussian distribution kernel of width size from -spectrum standard deviations to positive spectrum standard deviations
exports.gaussian =function (width,spectrum) {
  // Samples the gaussian function for width samples across -spectrum to spectrum deviations
  let sampleLocations = _.times(width).map( x => 2 * spectrum * (x/(width-1) -.5 ));
  let samples = sampleLocations.map(gaussianFunction);
  // Re-normalize to 1
  let sum = _.reduce(samples,(a,x) => a+x,0);
  return samples.map(x => x/sum);

  function gaussianFunction(x) {
    return Math.exp(-.5*x*x);
  }
}
