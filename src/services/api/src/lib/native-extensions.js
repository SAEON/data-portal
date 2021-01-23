export default (() => {
  String.prototype.toBoolean = function () {
    if (this.toLowerCase() === 'true') {
      return true
    }

    if (this.toLowerCase() === 'enabled') {
      return true
    }

    return false
  }
})()
