const userService = require("../servise/auth.service");
const userController = require("../db/user/controller");
const router = require("express").Router();
const jwt = require("jsonwebtoken");

const tokenKey = "rapoport";
//Регистрация нового пользователя
router.post("/registration", async (req, res) => {
  const createUser = await userService.registration(req, res);
  if (!!createUser.error) {
    return res.status(createUser.error).send(createUser.message);
  } else {
    return res.status(createUser.ok).send(createUser.message);
  }
});
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await userController.findName(username);
  if (!!user && username === user.username && password === user.password) {
    const token = await jwt.sign({ id: user._id }, tokenKey);
    if (!!user) {
      req.user = user;
      res.cookie("authorization", "Bearer " + token);
    }
    return res.status(200).send({ id: user._id, token, login: user.username });
  } else {
    const createUser = await userService.registration(req, res);
    if (!!createUser && !!createUser["error"]) {
      return res.status(createUser.error).send(createUser.message);
    } else {
      return res.status(createUser.ok).send(createUser.message);
    }
  }
});

//Создание курса
router.post("/role", async (req, res) => {
  const result = await userService.create(req.body);
  res.status(201).send(result);
});

router.get("/users", async (req, res) => {
  res.status(200).send(await userController.findAll());
});
module.exports = router;
