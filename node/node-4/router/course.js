const router = require("express").Router();

//Отображение всех курсов
router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.send({ data: [] });
});

//Создание курса
router.post("/", (req, res) => {
  res.send({ data: [] });
});

//Редактирование курса
router.put("/", (req, res) => {
  res.send({ data: [] });
});

module.exports = router;
