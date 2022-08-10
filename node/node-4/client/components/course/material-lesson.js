import React, { useState } from "react";
import styles from "../../styles/create-course.module.css";

export default function MaterialLesson({ id, lessonId }) {
  const [formData, setFormData] = useState();
  return (
    <>
      <form
        className={styles["form-file"]}
        action={`http://localhost:3001/course/${id}/lesson/${lessonId}/material`}
        method="post"
        encType="multipart/form-data"
      >
        <div className={styles["form-group"]}>
          <label className={styles["label"]}>
            <i className="material-icons">attach_file</i>
            <span className={styles["title"]}>
              {!!formData ? formData : `Добавить файл в материалы`}
            </span>
            <input
              name="file"
              id="file"
              type="file"
              onChange={(e) => {
                const data =
                  e.target.value.split(`\\`)[
                    e.target.value.split(`\\`).length - 1
                  ];
                setFormData(data);
              }}
              required
            />
          </label>
        </div>
        <label>
          <textarea
            name="title"
            id="title"
            placeholder="Описание материала"
            className={styles["form-title-input"]}
            required
          />
        </label>
        <button type="submit" className="btn btn-outline-secondary">
          Загрузить
        </button>
      </form>
    </>
  );
}
