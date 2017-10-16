"use strict";

const fetch = typeof window === 'undefined' ? require('node-fetch') : window.fetch;
const LoopbackModel = require(__dirname + '/LoopbackModel.js');

const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
};

class LoopbackClient {
  constructor(baseUrl, user, password) {
    this.user = user;
    this.password = password;
    this.token = null;
    this.baseUrl = baseUrl;
    this.headers = {};
  }

  setHeaders(headers) {
    this.headers = headers;
  }

  getBaseUrl() {
    return this.baseUrl;
  }

  getToken() {
    return this.token;
  }

  createToken() {
    return new Promise((resolve, reject) => {
      if (this.token) {
        resolve(this.token);
      }
      else {
        const data = {
          email: this.user,
          password: this.password
        };

        return fetch(this.baseUrl + '/users/login?include=user', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: this.headers
        })
          .then(handleErrors)
          .then(result => {
            this.token = result.id;
            resolve(this.token);
        });
      }
    });
  }

  getModel(name) {
    return new LoopbackModel(name, this);
  }
}

module.exports = LoopbackClient;
