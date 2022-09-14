const { Transform } = require("stream");
const { Sort } = require("./merge-sort");

module.exports = class SplittingFile extends Transform {
  constructor(opt) {
    super(opt);
  }
  _transform(chunk, encoding = "utf8", callback) {
    try {
      const data = chunk
        .toString()
        .split("\n")
        .map((el) => !!el && +el)
        .filter((el) => !!el);
      callback(null, Sort(data).join("\n") + "\n");
    } catch (err) {
      callback(err);
    }
  }
};
