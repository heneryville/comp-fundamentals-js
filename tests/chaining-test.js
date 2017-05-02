'use strict';

var assert = require('chai').assert
  , req = require('../chaining.js')
  , util = require('util')
;

const host = 'jsonplaceholder.typicode.com';

describe('chaining',function(){

  itIs('allows host',() => new req().host(host), {host: host} )
  itIs('allows port', () => new req().port(8080), {port: 8080} )
  itIs('allows method', () => new req().method('GET'), {method: 'GET'} )
  itIs('upper cases method', () => new req().method('get'), {method: 'GET'} )
  itIs('allows path', () => new req().path('/posts'), {path: '/posts'} )
  itIs('allows multiple paths',() => new req().path('/posts').path('1'), {path: '/posts/1'} )
  itIs('coerces to absolute path',() => new req().path('posts').path('1'), {path: '/posts/1'} )
  itIs('queries become a part of the path',() => new req().query('_limit',1), {path: '?_limit=1'} )
  itIs('can do queries and a path',() => new req().path('posts').query('_limit',1), {path: '/posts?_limit=1'} )
  itIs('can do multiple queries',() => new req().query('_limit',1).query('_page',2), {path: '?_limit=1&_page=2'} )
  itIs('can redefine a query',() => new req().query('_limit',1).query('_limit',2), {path: '?_limit=2'} )
  itIs('can define a header',() => new req().header('Accept','application/json'), {headers: {'Accept':'application/json'}} )

  itIs('can do everything',() =>
       new req()
        .host('json.typicode.com')
        .port(80)
        .method('GET')
        .path('posts')
        .path(1)
        .path('comments')
        .query('_page','1')
        .header('Accept','application/json')
     ,{
        host: 'json.typicode.com',
        port: 80,
        method: 'GET',
        path: '/posts/1/comments?_page=1',
        headers: {'Accept':'application/json' }
  })

  itIs('Supports GET method as a base value', () => req.get.path('posts'), {method: 'GET', path: '/posts' } )
  itIs('Supports POST method as a base value', () => req.post.path('posts'), {method: 'POST', path: '/posts' } )

  function itIs(name, builder, expected )  {
    it(name,function(){
      let actual = builder().options;
      assert.deepEqual(actual,expected);
    })
  }

});
