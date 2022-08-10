const UserInstance = require("../db/user/controller");
const jwt = require("jsonwebtoken");
const tokenKey = "rapoport";

class authService {
  constructor() {
    this.controller = UserInstance;
  }
  async registration(req, res) {
    try {
      const { username, password } = req.body;
      const validation = async () => {
        const usernameValid = await this.controller.findName(username);
        if (usernameValid) {
          return null;
        } else if (password.length > 6 && password.length < 10) {
          return true;
        } else {
          return null;
        }
      };
      if (!!(await validation)) {
        const courseId = await this.controller.create({
          username,
          password,
          roles: ["USER"],
        });
        const token = await jwt.sign({ id: courseId.id }, tokenKey);
        req.user = { ...courseId, password: "" };
        res.cookie("authorization", "Bearer " + token);
        return (
          courseId && {
            ok: 201,
            message: {
              ms: "Вы успешно зарегистрированы!",
              token,
              id: courseId.id,
              login: courseId.username,
            },
          }
        );
      } else {
        return { error: 401, message: "Ошибка регистрации!" };
      }
    } catch (error) {
      console.log(error);
    }
  }
  async login(req, res) {
    try {
    } catch (error) {
      console.log(error);
    }
  }
  async create(data) {
    return this.controller.create1(data);
  }
}

module.exports = new authService();
