'use strict';

var assert = require('chai').assert
  , deps = require('../dependencies.js')
  , util = require('util')
;

const standard = {
  // Graph from: http://3.bp.blogspot.com/-_O843pcKbig/UWmyeJUoJsI/AAAAAAAAFC0/r_-YKWOse
  nodes: ['Northwind.UI.WPF.exe','Northwind.ViewModel.dll','Northwind.Console.exe','Northwind.Application.dll','Northwind.Business.dll','Northwind.Interfaces.dll','Northwind.Data.dll','Northwind.Service.dll','Northwind.Ui.Silverlight.dll'],
  edges: {
    'Northwind.UI.WPF.exe': ['Northwind.ViewModel.dll'],
    'Northwind.ViewModel.dll': ['Northwind.Application.dll','Northwind.Interfaces.dll','Northwind.Data.dll'],
    'Northwind.Console.exe': ['Northwind.Application.dll','Northwind.Interfaces.dll'],
    'Northwind.Application.dll': ['Northwind.Interfaces.dll','Northwind.Business.dll'],
    'Northwind.Business.dll': ['Northwind.Interfaces.dll','Northwind.Data.dll'],
    'Northwind.Interfaces.dll': ['Northwind.Data.dll'],
    'Northwind.Data.dll': [],
    'Northwind.Service.dll': ['Northwind.Data.dll'],
    'Northwind.UI.Silverlight.dll': [],
  }
}

describe('dependency-resolution',function(){

  describe('install',function(){
    var sut = deps.install;

    itIs(['Northwind.ViewModel.dll'],['Northwind.ViewModel.dll','Northwind.Data.dll','Northwind.Application.dll','Northwind.Business.dll','Northwind.Interfaces.dll'])
    itIs(['Northwind.Interfaces.dll'],['Northwind.Interfaces.dll','Northwind.Data.dll'])
    itIs(['Northwind.Data.dll',],['Northwind.Data.dll'])
    itIs(['Northwind.UI.Silverlight.dll',],['Northwind.UI.Silverlight.dll'])
    itIs([],[])
    function itIs(require, expected) {
      var strRequire = require.join(', ');
      var strExpected = expected.join(', ');
      it(`[${strRequire}] => [${strExpected}]`,function(){
        var actual = sut(standard,require);
        assert.sameMembers(actual,expected);
      });
    }
  });

  describe('modify',function(){
    var sut = deps.modify;

    itIs(['Northwind.ViewModel.dll'],[],{add: ['Northwind.ViewModel.dll','Northwind.Data.dll','Northwind.Application.dll','Northwind.Business.dll','Northwind.Interfaces.dll'], keep: [], remove: []})
    itIs(['Northwind.ViewModel.dll'],['Northwind.ViewModel.dll','Northwind.Interfaces.dll'],{add: ['Northwind.Data.dll','Northwind.Application.dll','Northwind.Business.dll'], keep: ['Northwind.ViewModel.dll','Northwind.Interfaces.dll'], remove: []})
    itIs([],['Northwind.ViewModel.dll','Northwind.Data.dll','Northwind.Application.dll','Northwind.Business.dll','Northwind.Interfaces.dll'],{remove: ['Northwind.ViewModel.dll','Northwind.Data.dll','Northwind.Application.dll','Northwind.Business.dll','Northwind.Interfaces.dll'], keep: [], add: []})
    itIs([],[],{add:[],keep:[],remove:[]})
    itIs(['Northwind.UI.Silverlight.dll'],['Northwind.ViewModel.dll'],{add: ['Northwind.UI.Silverlight.dll'], keep: [], remove: ['Northwind.ViewModel.dll']})

    function itIs(require,current, expected) {
      var strRequire = require.join(', ');
      var strCurrent = current.join(', ');
      it(`[${strRequire}] X [${strCurrent}]`,function(){
        var actual = sut(standard,require,current);
        assert.sameMembers(actual.add,expected.add,'add');
        assert.sameMembers(actual.keep,expected.keep,'keep');
        assert.sameMembers(actual.remove,expected.remove,'remove');
      });
    }
  });


});
