const user = require("./user");
const role = require("./role");

class UserInstance {
  constructor() {
    this.user = user();
    this.role = role();
  }

  findOneById(id) {
    return this.user.findOne({ _id: id });
  }
  findByIdAndDelete(id) {
    return this.user.findByIdAndDelete(id);
  }
  updateOneName(data) {
    return this.user.updateOne({ _id: data.id }, { name: data.name });
  }
  updateOneByID(id, data) {
    return this.user.findByIdAndUpdate(id, data);
  }

  findAll() {
    const data = this.user.find();
    return data;
  }
  findName(name, option) {
    if (!!option) {
      return this.user.findOne({ username: name }).select(option);
    } else {
      return this.user.findOne({ username: name });
    }
  }

  create(user) {
    const instance = new this.user(user);
    return instance.save();
  }
  create1(user) {
    const instance = new this.role(user);
    return instance.save();
  }

  updateOneById(id, user) {
    return this.user.updateOne({ _id: id }, { $set: user });
  }

  deleteOneById(id) {
    return this.user.deleteOne({ _id: id });
  }
}
module.exports = new UserInstance();
