import React, { useState } from "react";

export default function CreateLesson({ styles, course_id }) {
  const [lessonActive, setLessonActive] = useState(false);
  const [data, setData] = useState({});
  const handelPush = async (e) => {
    await e.preventDefault();
    const cookies = document.cookie.split("authorization=")[1];
    const result = await fetch(
      `http://localhost:3001/course/${course_id}/lesson`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          authorization: "Bearer " + cookies,
        },
        body: JSON.stringify(data),
      }
    );
    if (result.ok) {
      alert("Занятие добавлено!");
      window.location.reload();
    } else {
      const newRes = await result.json();
      alert("Ошибка! " + newRes.error);
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={() => setLessonActive(!lessonActive)}
      >
        Создать занятие
      </button>

      {!!lessonActive && (
        <>
          <div>
            <form onSubmit={handelPush}>
              <div className={styles["form-title"]}>
                <label>
                  <input
                    name="title"
                    id="title"
                    placeholder="Название занятия"
                    className={styles["form-title-input"]}
                    onChange={(e) =>
                      setData({ ...data, title: e.target.value })
                    }
                    required
                  />
                </label>
                <label style={{ marginTop: "1rem" }}>
                  <input
                    name="requirement"
                    id="requirement"
                    placeholder="Требование к обучающемуся"
                    className={styles["form-title-input"]}
                    onChange={(e) =>
                      setData({ ...data, requirement: e.target.value })
                    }
                    required
                  />
                </label>
                <label style={{ marginTop: "1rem" }}>
                  <input
                    name="format"
                    id="format"
                    placeholder="Формат занятия"
                    className={styles["form-title-input"]}
                    onChange={(e) =>
                      setData({ ...data, format: e.target.value })
                    }
                  />
                </label>
              </div>

              <div className={styles["form-file"]}>
                <div className={styles["form-group"]}>
                  <label>
                    <textarea
                      name="description"
                      id="description"
                      placeholder="Описание занятия"
                      className={styles["from-description"]}
                      onChange={(e) =>
                        setData({ ...data, description: e.target.value })
                      }
                      required
                    />
                  </label>
                </div>
              </div>
              <div className={styles["form-btn"]}>
                <label>
                  <button
                    type="submit"
                    className="btn btn-outline-secondary"
                    onClick={() => console.log(data)}
                  >
                    Создать занятие
                  </button>
                </label>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}
