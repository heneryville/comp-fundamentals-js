'use strict';
const _ = require('lodash');

/**
 * Supports chaining composition of request options for the NodeJS http.request function.
 * Example usage
 * RequestOptions.get
 * .host('jsonplaceholder.typicode.com')
 * .port(80)
 * .method('GET')
 * .path('posts')
 * .path(1)
 * .path('comments')
 * .query('_page','1')
 * .header('Accept','application/json');
 */
class RequestOptions {

  constructor(opts) {
    this.opts = opts || {};
  }

  host(host) {
    throw new Error('Net yet implemented');
  }

  port(port) {
    throw new Error('Net yet implemented');
  }

  method(method) {
    throw new Error('Net yet implemented');
  }

  path(path) {
    throw new Error('Net yet implemented');
  }

  query(key,val) {
    throw new Error('Net yet implemented');
  }

  header(key,val) {
    throw new Error('Net yet implemented');
  }

  get options() {
    throw new Error('Net yet implemented');
  }

  static get get() {
    throw new Error('Net yet implemented');
  }

  static get post() {
    throw new Error('Net yet implemented');
  }
}

module.exports = RequestOptions;
