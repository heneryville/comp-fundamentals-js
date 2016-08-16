var assert = require('chai').assert
  , booleanAlgebra = require('../boolean-algebra.js')

describe('boolean-algebra',function(){
  describe('isPointInRect',function(){
    var sut = booleanAlgebra.isPointInRect;
    //Test rect is at 2,4,5,6
    itIs('off left side',1,6,false)
    itIs('off right side',8,6,false)
    itIs('off top side',4,2,false)
    itIs('off bottom side',4,11,false)
    itIs('inside',3,5,true)
    itIs('on left side',2,6,true)
    itIs('on right side',7,6,true)
    itIs('on top side',4,4,true)
    itIs('on bottom side',4,10,true)

    function itIs(name,x,y,result) {
      it(name,function(){
        assert.equal(result, sut(x,y,{x: 2, y: 4, w: 5, h: 6}))
      })
    }
  });

  describe('isRectInRect',function(){
    var sut = booleanAlgebra.isRectInRect;
    //Test rect is at 2,4,5,6
    //Input rects all have a w and h of 2
    itIs('off left side',-10,4,false)
    itIs('off right side',100,4,false)
    itIs('off top side',4,-10,false)
    itIs('off bottom side',4,100,false)

    itIs('overlaps left side',1,4,true)
    itIs('overlaps right side',6,4,true)
    itIs('overlaps top side',4,3,true)
    itIs('overlaps bottom side',4,9,true)

    itIs('inside',3,5,true)

    itIs('right on left side',0,6,false)
    itIs('on right side',7,6,false)
    itIs('on top side',4,2,false)
    itIs('on bottom side',4,10,false)

    it('consumes the inner',function(){
      assert.equal(true, sut({x: -100, y: -100, w: 100000, h: 100000},{x: 2, y: 4, w: 5, h: 6}))
    })

    function itIs(name,x,y,result) {
      it(name,function(){
        assert.equal(result, sut({x: x, y: y, w: 2, h: 2},{x: 2, y: 4, w: 5, h: 6}))
      })
    }
  });
});
