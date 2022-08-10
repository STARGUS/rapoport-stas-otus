import styles from "../styles/accordion.module.css";
import React from "react";
import CommentLesson from "./course/comment-lesson";
import Trash from "./img/trash";
import MaterialLesson from "./course/material-lesson";
export default function Accordion({
  lesson,
  user,
  course_id,
  author_id,
  data,
}) {
  const handelDelete = async (lesson_id) => {
    const cookies = document.cookie.split("authorization=")[1];
    const result = await fetch(
      `http://localhost:3001/course/${course_id}/lesson/${lesson_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          authorization: "Bearer " + cookies,
        },
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
      <div className="accordion accordion-flush" id="accordionFlushExample">
        {lesson.map((el, index) => (
          <div className="accordion-item" key={index + "accordion-item"}>
            <h2
              className="accordion-header"
              id={"flush-headingOne" + index}
              style={{ display: "grid", justifyItems: "end" }}
              onClick={() => console.log(el._id)}
            >
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={"#flush-collapseOne" + index}
                aria-expanded="false"
                aria-controls={"flush-collapseOne" + index}
              >
                <div className={styles.learning_near__header_link}>
                  <div className={styles.learning_near__number}>
                    {+index + 1}
                  </div>
                </div>
                {el.title}
              </button>
              {!!data.edit && (
                <pem
                  className={styles.learning_trash}
                  onClick={() => {
                    console.log(el);
                    handelDelete(el._id);
                  }}
                >
                  <Trash />
                </pem>
              )}
            </h2>
            <div
              id={"flush-collapseOne" + index}
              className="accordion-collapse collapse"
              aria-labelledby={"flush-headingOne" + index}
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">{el.description}</div>
              <MaterialLesson id={course_id} lessonId={el._id} />
              <CommentLesson
                data={el.comments}
                user={user}
                course_id={course_id}
                author_id={author_id}
                lesson_id={el._id}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
