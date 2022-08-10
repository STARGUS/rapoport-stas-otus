const model = require("./model");

class CourseInstance {
  constructor() {
    this.model = model();
  }
  //Данные курса
  findOneById(id) {
    return this.model.findOne({ _id: id }).select({
      title: 1,
      author: 1,
      description: 1,
      photo: 1,
      id: 1,
      lessons: { title: 1, description: 1, _id: 1, id: 1, comments: 1 },
    });
  }
  //Возвращает полную форму если у пользователя есть права
  async findOneByIdFromUser(id, user_id) {
    const data = await this.model.findOne({ _id: id });
    const result = data.permit.includes(user_id);
    const resAuthor = data.author.name == user_id;
    if (!!result || !!resAuthor) {
      if (data.author.name == user_id) {
        data._doc.edit = true;
        return data;
      } else {
        return data;
      }
    } else {
      return this.findOneById(id);
    }
  }
  //Данные курсов
  findAll() {
    const data = this.model.find().select({
      title: 1,
      author: 1,
      description: 1,
      photo: 1,
      _id: 1,
      comments: 1,
    });
    return data;
  }
  //Создать курс
  create(course) {
    const instance = new this.model(course);
    return instance.save();
  }
  //Создать занятие
  createLesson(id, data) {
    const instance = this.model.updateOne(
      { _id: id },
      { $push: { lessons: data } }
    );
    return instance;
  }
  //Удалить занятие
  deleteLesson(id, lessonId) {
    return this.model.updateOne(
      { _id: id, "lessons._id": lessonId },
      { $pull: { lessons: { _id: lessonId } } }
    );
  }
  //Редактирование занятия
  updateLesson(id, lessonId, lesson) {
    return this.model.updateOne(
      {
        _id: id,
        "lessons._id": lessonId,
      },
      {
        $set: { "lessons.$": lesson },
      }
    );
  }
  //Удаление файла из материалов
  updateFileLesson({ id, lessonId, fileId }) {
    return this.model.updateOne(
      { _id: id, "lessons._id": lessonId },
      {
        $pull: {
          "lessons.$.materials": { _id: fileId },
        },
      }
    );
  }
  //Добавление файла материалов
  createFileLesson({ id, lessonId, title, url }) {
    return this.model.updateOne(
      { _id: id, "lessons._id": lessonId },
      {
        $push: {
          "lessons.$.materials": {
            title: title,
            url: url,
          },
        },
      }
    );
  }
  //Обновление данных курса
  updateOneById(id, course) {
    return this.model.updateOne({ _id: id }, { $set: course });
  }
  //Добавление роли пользователя для доступа к курсу
  async updateOneByIdRolePush(id, newRole, username) {
    // Добавить проверку на уже существующего пользователя
    const user = await this.model.findOne({ _id: id });
    if (!user.permit.includes(newRole) && !user.permit.includes(username)) {
      await user.permit.push(username);
      return await user.save();
    } else {
      return { error: "Данный пользователь уже добавлен в базу ролей!" };
    }
  }
  //Удаление курса по id
  deleteOneById(id) {
    return this.model.deleteOne({ _id: id });
  }
  //Обновление комментария
  async updateComment(id, lessonId, commentId, newComment) {
    //Условие если нет комментариев!
    const item = await this.model.findOne({ _id: id });
    const lessonIndex = await item.lessons
      .map((item) => item.id)
      .indexOf(lessonId);
    const commentIndex = await item.lessons[lessonIndex].comments
      .map((el) => el.id)
      .indexOf(commentId);
    item.lessons[lessonIndex].comments[commentIndex].body = newComment;
    return await item.save();
  }
  //Удаление комментария
  async deleteComment(id, lessonId, commentId) {
    const item = await this.model.updateOne(
      { _id: id, "lessons._id": lessonId, "lessons.$.comments._id": commentId },
      {
        $pull: {
          "lessons.$.comments": { _id: commentId },
        },
      }
    );
    return item.acknowledged;
  }
  //Создание комментария
  async createComment(id, lessonId, newComment) {
    if (!!newComment.body && !!newComment.author) {
      return this.model.updateOne(
        { _id: id, "lessons._id": lessonId },
        {
          $push: {
            "lessons.$.comments": {
              body: newComment.body,
              author: newComment.author,
            },
          },
        }
      );
    } else {
      return false;
    }
  }
}

module.exports = new CourseInstance();
