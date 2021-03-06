"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fetch = typeof window === 'undefined' ? require('node-fetch') : window.fetch;
var LoopbackModel = require(__dirname + '/LoopbackModel.js');

var handleErrors = function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
};

var LoopbackClient = function () {
  function LoopbackClient(baseUrl, user, password) {
    _classCallCheck(this, LoopbackClient);

    this.user = user;
    this.password = password;
    this.token = null;
    this.baseUrl = baseUrl;
    this.headers = {};
  }

  _createClass(LoopbackClient, [{
    key: 'setHeaders',
    value: function setHeaders(headers) {
      this.headers = headers;
    }
  }, {
    key: 'getBaseUrl',
    value: function getBaseUrl() {
      return this.baseUrl;
    }
  }, {
    key: 'getToken',
    value: function getToken() {
      return this.token;
    }
  }, {
    key: 'createToken',
    value: function createToken() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        if (_this.token) {
          resolve(_this.token);
        } else {
          var data = {
            email: _this.user,
            password: _this.password
          };

          return fetch(_this.baseUrl + '/users/login?include=user', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: _this.headers
          }).then(handleErrors).then(function (result) {
            _this.token = result.id;
            resolve(_this.token);
          });
        }
      });
    }
  }, {
    key: 'getModel',
    value: function getModel(name) {
      return new LoopbackModel(name, this);
    }
  }]);

  return LoopbackClient;
}();

module.exports = LoopbackClient;