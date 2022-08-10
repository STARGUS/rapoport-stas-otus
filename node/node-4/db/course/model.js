const mongoose = require("mongoose");

module.exports = () => {
  const comment = new mongoose.Schema(
    {
      body: { type: String, required: true }, //Текс сообщения
      date: { type: Date, default: Date.now }, //Дата создания
      author: { type: String, required: true }, //Автор сообщения
    },
    { autoIndex: true }
  );
  const Course = new mongoose.Schema(
    {
      title: { type: String, required: true, unique: true }, //Название курса
      author: {
        id: { type: String, required: true }, //id Пользователя (Создателя)
        name: { type: String, required: true }, //Его имя
      },
      date: { type: Date, default: Date.now }, //Дата создания
      description: { type: String }, //Описание курса
      photo: { type: String }, //Титульное фото курса
      lessons: [
        //Список занятий курса
        {
          title: { type: String, required: true }, //Название занятия
          requirement: String, // Рекомендация для прохождения занятия
          format: String, //Формат занятия
          description: { type: String, required: true }, //Описание
          materials: [
            //Материалы для занятия
            {
              title: { type: String, required: true },
              url: { type: String, required: true },
              date: { type: Date, default: Date.now },
            },
          ],
          comments: [comment], //Комментарии к занятию
        },
      ],
      permit: [{ type: String }], //Список разрешенных пользователей
    },

    { autoIndex: true }
  );

  return mongoose.model("Course", Course);
};
