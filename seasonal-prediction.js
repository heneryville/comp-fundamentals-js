const regression = require('regression')
const _ = require('lodash');


// [year, month, value]
exports.learn = function(data) {
}

exports.predict = function(datapoint, model) {
  let yearValue = model.gradient * datapoint[0] + model.yIntercept;
  let portionSegunSeason = model.seasonComposition[datapoint[1]];
  return yearValue * portionSegunSeason;
}
