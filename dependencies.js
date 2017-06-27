const _ = require('lodash');

// Given the passed DAG (directed a-cyclic graph) (in format {nodes; [NAME_OF_ALL_NODES], edges: { SOURCE_NODE: DEST_NODE  } })
// and an array of nodes that we want to install (require)
// return the array of all things we should install
exports.install = function(graph,require) {
  return [];
}

// Given the passed DAG (directed a-cyclic graph) (in format {nodes; [NAME_OF_ALL_NODES], edges: { SOURCE_NODE: DEST_NODE  } })
// and an array of nodes that we want to install (require)
// and an array of existing nodes that are installed (current)
// return the an object such that
// {
//   add: [] - Nodes to be added
//   keep: [] - Nodes to be kept
//   remove: [] - Nodes to be removed
// }
exports.modify = function(graph, require, current) {
  return {
    add: [],
    keep: [],
    remove: []
  };
}
