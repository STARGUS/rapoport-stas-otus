const courseController = require("../db/course/controller");

module.exports = async (req, res, next) => {
  if (req.user && !!req.params.id) {
    const { id } = req.params;
    const course = await courseController.findOneById(id);
    const result = await (course.author.id == req.user.id);
    if (!result) {
      return res.status(403).send({ error: "У вас недостаточно прав!" });
    }
  } else {
    return res.status(401).send({ error: "Пользователь не авторизирован!" });
  }
  next();
};
