"use strict";

const fetch = typeof window === 'undefined' ? require('node-fetch') : window.fetch;
const qs = require('qs');

const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
};

const getQueryParams = (query) =>
  query && qs.stringify(query)
  ? '?' + qs.stringify(query)
  : '';

class LoopbackModel {
  constructor(model, tokenClient) {
    this.baseUrl = tokenClient.getBaseUrl();
    this.headers = tokenClient.headers;
    this.headers.authorization = tokenClient.getToken();
    this.model = model
  }

  get(url, query) {
    return  fetch(url + getQueryParams(query), {
          method: 'GET',
          headers: this.headers,
        }
      ).then(handleErrors);
  }

  post(url, data, query) {
    return fetch(url + getQueryParams(query), {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(data)
      }).then(handleErrors);
  }

  put(url, data) {
    return fetch(url, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify(data)
    }).then(handleErrors);
  }

  del(url) {
    return fetch(url, {
      method: 'DELETE',
      headers: this.headers,
    }).then(handleErrors);
  }

  findById(data) {
    const url = `${this.baseUrl}/${this.model}/${data.id}`;
    return this.get(url, {filter: data.filter});
  }

  create(data) {
    const url = `${this.baseUrl}/${this.model}`;
    return this.post(url, data);
  }

  count(where) {
    const url = `${this.baseUrl}/${this.model}/count`;
    return this.get(url, where);
  }

  updateAll(query, data) {
    const url = `${this.baseUrl}/${this.model}/update`;
    return this.post(url, data, query);
  }

  updateById(id, data) {
    const url = `${this.baseUrl}/${this.model}/${id}`;
    return this.put(url, data);
  }

  find(filter) {
    const url = `${this.baseUrl}/${this.model}`;
    return this.get(url, filter);
  }

  findOne(query) {
    const url = `${this.baseUrl}/${this.model}/findOne`;
    return this.get(url, query);
  }

  deleteById(id) {
    const url = `${this.baseUrl}/${this.model}/${id}`;
    return this.del(url);
  }
}


module.exports = LoopbackModel;
