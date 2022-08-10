const mongoose = require("mongoose");

module.exports = () => {
  const Role = new mongoose.Schema({
    value: { type: String, unique: true, default: "USER" }, //Список ролей, по умолчанию присваивается user
  });
  return mongoose.model("Role", Role);
};
