const assert = require('chai').assert;
const fsTraverse = require('../fs-traverse');
const path = require('path')

describe('fs-traverse',function(){

  describe('traverse-sync',function(){

    itIs('finds all files with no exclusions one dir deep','/a',[],['/a-f.txt']);
    itIs('finds all files with no exclusions','/',[],['/a/a-f.txt','/b/a/a/a/a/baaaa-f.txt','/b/b-f.txt','/b/b/bb-f.txt','/f.txt']);
    itIs('finds all files with no exclusions','/',['/b'],['/a/a-f.txt','/f.txt']);

    function itIs(name,base,rules,expected) {
      base = path.join(__dirname,'../data/fs-traverse/',base)

      it(name + ' -- sync', function(){
        let actual = fsTraverse.traverseSync(base,rules);
        //console.log('  Actual',actual.join(','))
        //console.log('Expected',expected.join(','))
        assert.sameMembers(actual,expected);
      })

      it(name + ' -- callbacks', function(done){
        let actual = fsTraverse.traverse(base,rules,(err,actual) => {
          if(err) return done(err);
          try{
              //console.log('  Actual',actual.join(','))
              //console.log('Expected',expected.join(','))
              assert.sameMembers(actual,expected);
              done();
          }catch(e) {
            done(e)
          }
        });
      })

      it(name + ' -- promise', function(done){
        fsTraverse.traverseAsync(base,rules).then(actual => {
          //console.log('  Actual',actual.join(','))
          //console.log('Expected',expected.join(','))
          assert.sameMembers(actual,expected);
          done()
        }).catch(done);
      })
    }

  })

})
