const { Transform } = require("stream");

class Transforming extends Transform {
  constructor(array) {
    super({ objectMode: true });
    this.array = array;
    this.index = 0;
  }
  _write() {}
  _read() {
    if (this.index < this.array.length) {
      const chunk = this.array[this.index];
      this.push(chunk);
      this.index += 1;
    } else {
      this.push(null);
    }
  }
}

module.exports = Transforming;
