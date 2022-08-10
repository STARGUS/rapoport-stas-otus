const courseController = require("../db/course/controller");
const userController = require("../db/user/controller");
const router = require("express").Router();
const { uploadMidleWare, roleMidleWare } = require("../midleware");

//Отображение всех курсов
router.get("/", async (req, res) => {
  try {
    const courseId = await courseController.findAll();
    const data = { data: courseId };
    if (req.user) {
      data["user"] = await { username: req.user.username, id: req.user._id };
    }
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send({ error: "Страница не найдена" });
  }
});

//Отображение курса по id
router.get("/course/:id", async (req, res) => {
  try {
    if (req.user) {
      const data = await courseController.findOneByIdFromUser(
        req.params.id,
        req.user.username
      );
      const user = await { username: req.user.username, id: req.user._id };
      res.status(200).send({ data, user });
    } else {
      const data = await courseController.findOneById(req.params.id);
      res.status(200).send({ data });
    }
  } catch (error) {
    res.status(404).send({ error: "Страница не найдена" });
  }
});

//-------------------------------Управление курсами------------------
//Создание курса
router.post("/create-course", async (req, res) => {
  try {
    if (req.user) {
      const data = {
        ...req.body,
        author: { name: req.user.username, id: req.user.id },
      };
      const result = await courseController.create(data);
      res.status(201).send(result);
    } else {
      console.log("Ошибка", req.user);
      return res.status(401).send({ error: "Пользователь не авторизирован!" });
    }
  } catch (error) {
    res.status(400).send({ error: "Ошибка запроса" });
  }
});
//Добавление ролей для курса
router.put("/course/:id/newrole", roleMidleWare, async (req, res) => {
  const { username } = req.body;
  const user_id = await userController.findName(username, {
    username: 1,
    _id: 1,
  });
  if (user_id.id) {
    const result = await courseController.updateOneByIdRolePush(
      req.params.id,
      user_id.id,
      user_id.username
    );
    if (typeof result == "object" && !!result.error) {
      res.status(400).send(result);
    } else {
      res.status(201).send(result);
    }
  } else {
    res.status(401).send({ error: "Данного пользователя не существует!" });
  }
});
//Редактирование курса
router.put("/course/:id", roleMidleWare, async (req, res) => {
  const { id } = req.params;
  const result = await courseController.updateOneById(id, { ...req.body });
  if (result) {
    return res.status(201).send("Отредактировано!");
  } else {
    res.status(400).send("Ошибка!");
  }
});
router.delete("/course/:id", roleMidleWare, async (req, res) => {
  const result = await courseController.deleteOneById(req.params.id);
  if (result.acknowledged) {
    return res.status(202).send("Курс удален");
  }
  return res.status(404).send({ error: "Ошибка. Курс не найден!" });
});
//-------------------------------Управление занятиями----------------
//Создание занятия
router.post("/course/:id/lesson", roleMidleWare, async (req, res) => {
  const data = {
    ...req.body,
  };
  const result = await courseController.createLesson(req.params.id, data);
  return await res.status(201).send(result);
});
router.put("/course/:id/lesson/:lessonId", roleMidleWare, async (req, res) => {
  const result = await courseController.updateLesson(
    req.params.id,
    req.params.lessonId,
    ...req.body
  );
  return await res.status(201).send(result);
});
//Добавление материала
router.post(
  "/course/:id/lesson/:lessonId/material",
  roleMidleWare,
  uploadMidleWare.single("file"),
  async (req, res) => {
    if (req.file) {
      const { id, lessonId } = req.params;
      const { path } = req.file;
      const { title } = req.body;
      const resultFile = await courseController.createFileLesson({
        id,
        lessonId,
        title,
        url: path,
      });
      return res.redirect("http://localhost:3000/course/" + id);
    }
  }
);
//Удаление материалв
router.delete(
  "/course/:id/lesson/:lessonId/material/:fileId",
  roleMidleWare,
  async (req, res) => {
    const { id, lessonId, fileId } = req.params;
    const resultFile = await courseController.updateFileLesson({
      id,
      lessonId,
      fileId,
    });
    return res.status(201).send(resultFile);
  }
);
//Удаление занятия на курсе
router.delete(
  "/course/:id/lesson/:lessonId",
  roleMidleWare,
  async (req, res) => {
    const { id, lessonId } = req.params;
    const result = await courseController.deleteLesson(id, lessonId);
    return res.status(201).send(result);
  }
);

//-------------------------------Комменты----------------------------
//Создать комментарий
router.post("/course/:id/lesson/:lessonId/comment", async (req, res) => {
  if (req.user) {
    if (!!req.body.author && req.body.body) {
      const { id, lessonId } = req.params;
      const { body, author } = req.body;
      const result = await courseController.createComment(id, lessonId, {
        body,
        author,
      });
      if (!!result) {
        return res.status(201).send("Комментарий добавлен");
      } else {
        return res.status(400).send({
          error: "Ошибка данных пользователя",
        });
      }
    } else {
      return res.status(400).send({
        error: "Ошибка данных пользователя",
      });
    }
  } else {
    return res.status(401).send({ error: "Пользователь не авторизирован!" });
  }
});
// Изменить комментарий
router.put(
  "/course/:id/lesson/:lessonId/comment/:commentId",
  async (req, res) => {
    if (req.user) {
      if (!req.body.comment) {
        return res.status(400).send({
          error: "Ошибка отсутствует комментарий",
        });
      }
      const { id, lessonId, commentId } = req.params;
      const { comment } = req.body;
      const result = await courseController.updateComment(
        id,
        lessonId,
        commentId,
        comment
      );
      if (result.id === id) {
        return res.status(201).send("Комментарий изменен");
      } else {
        return res.status(400).send({
          error: "Неизвестная ошибка проверьте правильность ввода комментария",
        });
      }
    } else {
      return res.status(401).send({ error: "Пользователь не авторизирован!" });
    }
  }
);
//Удалить комментарий
router.delete(
  "/course/:id/lesson/:lessonId/comment/:commentId",
  async (req, res) => {
    if (req.body) {
      const { id, lessonId, commentId } = req.params;
      const result = await courseController.deleteComment(
        id,
        lessonId,
        commentId
      );
      if (!!result) {
        return res.status(201).send("Комментарий удален");
      } else {
        return res.status(400).send({
          error: "Неизвестная ошибка",
        });
      }
    } else {
      return res.status(401).send({ error: "Пользователь не авторизирован!" });
    }
  }
);

module.exports = router;
