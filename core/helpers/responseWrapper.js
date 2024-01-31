class ResponseWrapper {
  constructor(data, method, message, success, status) {
    this.data = data;
    this.method = method;
    this.message = message;
    this.success = success;
    this.status = status;
  }
}

module.exports = (data, method, message, success, status) =>
  new ResponseWrapper(data, method, message, success, status);
