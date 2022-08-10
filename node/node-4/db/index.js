const mongoose = require("mongoose");

module.exports = {
  async run() {
    return await mongoose.connect("mongodb://localhost:27017/node-4", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  },
};
