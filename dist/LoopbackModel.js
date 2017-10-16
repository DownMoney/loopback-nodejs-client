"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fetch = typeof window === 'undefined' ? require('node-fetch') : window.fetch;
var qs = require('qs');

var handleErrors = function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
};

var getQueryParams = function getQueryParams(query) {
  return query && qs.stringify(query) ? '?' + qs.stringify(query) : '';
};

var LoopbackModel = function () {
  function LoopbackModel(model, tokenClient) {
    _classCallCheck(this, LoopbackModel);

    this.baseUrl = tokenClient.getBaseUrl();
    this.headers = tokenClient.headers;
    this.headers.authorization = tokenClient.getToken();
    this.model = model;
  }

  _createClass(LoopbackModel, [{
    key: 'get',
    value: function get(url, query) {
      return fetch(url + getQueryParams(query), {
        method: 'GET',
        headers: this.headers
      }).then(handleErrors);
    }
  }, {
    key: 'post',
    value: function post(url, data, query) {
      return fetch(url + getQueryParams(query), {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(data)
      }).then(handleErrors);
    }
  }, {
    key: 'put',
    value: function put(url, data) {
      return fetch(url, {
        method: 'PUT',
        headers: this.headers,
        body: JSON.stringify(data)
      }).then(handleErrors);
    }
  }, {
    key: 'del',
    value: function del(url) {
      return fetch(url, {
        method: 'DELETE',
        headers: this.headers
      }).then(handleErrors);
    }
  }, {
    key: 'findById',
    value: function findById(data) {
      var url = this.baseUrl + '/' + this.model + '/' + data.id;
      return this.get(url, { filter: data.filter });
    }
  }, {
    key: 'create',
    value: function create(data) {
      var url = this.baseUrl + '/' + this.model;
      return this.post(url, data);
    }
  }, {
    key: 'count',
    value: function count(where) {
      var url = this.baseUrl + '/' + this.model + '/count';
      return this.get(url, where);
    }
  }, {
    key: 'updateAll',
    value: function updateAll(query, data) {
      var url = this.baseUrl + '/' + this.model + '/update';
      return this.post(url, data, query);
    }
  }, {
    key: 'updateById',
    value: function updateById(id, data) {
      var url = this.baseUrl + '/' + this.model + '/' + id;
      return this.put(url, data);
    }
  }, {
    key: 'find',
    value: function find(filter) {
      var url = this.baseUrl + '/' + this.model;
      return this.get(url, filter);
    }
  }, {
    key: 'findOne',
    value: function findOne(query) {
      var url = this.baseUrl + '/' + this.model + '/findOne';
      return this.get(url, query);
    }
  }, {
    key: 'deleteById',
    value: function deleteById(id) {
      var url = this.baseUrl + '/' + this.model + '/' + id;
      return this.del(url);
    }
  }]);

  return LoopbackModel;
}();

module.exports = LoopbackModel;