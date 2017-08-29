const assert = require('chai').assert;
const treeClassifier = require('../tree-classifier');
const fs = require('fs');
const path = require('path');

describe('tree-classifier', () => {

  describe('classify', () => {
    const degenerateTree = {class: 'C'}
    const simpleTree = {attr: 'a', threshold: 5, lnode: {class: 'A'}, rnode: {class: 'B'}};
    const complexTree = {
      attr: 'a', threshold: 5,
      lnode: {
        attr: 'b', threshold: 50,
        lnode: {class: 'A'},
        rnode: {class: 'B'}
      },
      rnode: {
        attr: 'b', threshold: 25,
        lnode: {class: 'C'},
        rnode: {class: 'D'}
      },
    };

    itIs('A node classifiers as it\'s class ',{a: 4},degenerateTree,'C')
    itIs('Less than threshold goes left',{a: 4},simpleTree,'A')
    itIs('Greater than threshold goes right',{a: 7},simpleTree,'B')
    itIs('Equal to theshold goes left',{a: 5},simpleTree,'A')
    itIs('It can consider multiple elements',{a: 4, b: 48},complexTree,'A')
    itIs('It can consider multiple elements',{a: 4, b: 51},complexTree,'B')
    itIs('It can consider multiple elements',{a: 6, b: 11},complexTree,'C')
    itIs('It can consider multiple elements',{a: 6, b: 26},complexTree,'D')

    function itIs(name,dp,tree,expected) {
      it(name,function(){
        const actual = treeClassifier.classify(dp,tree);
        assert.equal(actual,expected);
      })
    }
  })

  describe('confusion matrix',() => {

    it('finds a confusion matrix',() => {
      let data = fs.readFileSync( path.join(__dirname, '/../data/height-weight-age-gender-2.csv'),'utf8')
        .trim()
        .split('\n')
        .slice(1)
        .map(x => x.split(','))
        .map(x => ({height: +x[0], weight: +x[1], age: +x[2], gender: x[3]}))
      ;
      let tree = {
        attr: 'height',
        threshold: 156.21,
        lnode: {
          attr: 'height',
          threshold: 150.495,
          lnode: {class: 'female'},
          rnode: {
            attr: 'age',
            threshold: 74,
            lnode: {class: 'female'},
            rnode: {class: 'male' }
          }
        },
        rnode: {class: 'male'}
      };

      let actual = treeClassifier.confusionMatrix(data,tree, 'gender',['male','female']);
      assert.deepEqual(actual,[[138,119],[13,274]])
    })
  })
})
