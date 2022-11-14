const mongoose = require("mongoose");
module.exports = () => {
  const User = new mongoose.Schema(
    {
      username: { type: String, unique: true, required: true }, //Имя пользователя
      password: { type: String, required: true }, //Пароль
      roles: [{ type: String, ref: "Role" }], // Роль
    },
    { autoIndex: true }
  );
  return mongoose.model("User", User);
};
