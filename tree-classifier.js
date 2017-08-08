// datapoint is an object of any shape
// decisionTree is an object of two possible types:
//   If the class key is defined, then this is a leaf node associating the datapoint to this class
//   Otherwise, it appears as {attr: STRING: threshold: NUMBER: lnode: DECISION_TREE, rnode: DECISION_TREE}
//   otherwise, the attr and the threshold keys define a threshold on an attribute,
//   going to the lnode if it's less than or equal, and rnode otherwise
exports.classify = function(datapoint, decsisionTree) {
  return null;
}

exports.confusionMatrix = function(data, decsisionTree,klassAttr,order) {
  let matrix = order.map(x => order.map(y => 0));
  return matrix;
}
