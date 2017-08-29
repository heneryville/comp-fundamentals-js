// datapoint is an object of any shape
// decisionTree is an object of two possible types:
//   If the class key is defined, then this is a leaf node associating the datapoint to this class
//   Otherwise, it appears as {attr: STRING: threshold: NUMBER: lnode: DECISION_TREE, rnode: DECISION_TREE}
//   otherwise, the attr and the threshold keys define a threshold on an attribute,
//   going to the lnode if it's less than or equal, and rnode otherwise

const _ = require('lodash');

exports.classify = function(datapoint, decisionTree) {
  if(decisionTree.class) return decisionTree.class;
  if(datapoint[decisionTree.attr] <= decisionTree.threshold) return exports.classify(datapoint,decisionTree.lnode)
  return exports.classify(datapoint,decisionTree.rnode)
}

exports.confusionMatrix = function(data, decisionTree,klassAttr,order) {
  let matrix = order.map(x => order.map(_.constant(0)));

  _.forEach(data,dp=>{
    let actual = exports.classify(dp,decisionTree)
    let expected = dp[klassAttr];
    let iactual = order.indexOf(actual);
    let iexpected = order.indexOf(expected);
    matrix[iexpected][iactual]++;
  })
  return matrix;
}
