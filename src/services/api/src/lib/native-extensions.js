export default (() => {
  String.prototype.toBoolean = function () {
    return this.toLowerCase() === 'true'
  }
})()
