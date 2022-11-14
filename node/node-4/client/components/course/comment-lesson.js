import Pencil from "../img/pencil";
import React, { useState } from "react";
import CommentLessonItem from "./comment-lesson-item";
import Router from "next/router";

export default function CommentLesson({
  data,
  user,
  course_id,
  author_id,
  lesson_id,
}) {
  const [dataComment, setDataComment] = useState("");
  const handelPush = async (e) => {
    await e.preventDefault();
    if (!user) {
      return await Router.push("/registration");
    } else {
      const cookies = document.cookie.split("authorization=")[1];
      const result = await fetch(
        `http://localhost:3001/course/${course_id}/lesson/${lesson_id}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            authorization: "Bearer " + cookies,
          },
          body: JSON.stringify({ body: dataComment, author: user.username }),
        }
      );
      if (result.ok) {
        alert("Комментарий добавлен!");
        window.location.reload();
      } else {
        if (result.status == "401") {
          Router.push("/registration");
        } else {
          const newRes = await result.json();
          alert("Ошибка! " + newRes.error);
        }
      }
    }
  };
  return (
    <>
      <section>
        <div className="container my-5 py-5">
          <div className="row d-flex justify-content-center">
            <div className="col-md-12 col-lg-10 col-xl-8">
              <div className="card">
                {data.map((el, index) => (
                  <CommentLessonItem
                    el={el}
                    index={index}
                    key={index + "itemComment"}
                    user={user}
                    course_id={course_id}
                    author_id={author_id}
                    lesson_id={lesson_id}
                  />
                ))}
                <div
                  className="card-footer py-3 border-0"
                  // style="background-color: #f8f9fa;"
                >
                  <form onSubmit={handelPush}>
                    <div className="d-flex flex-start w-100">
                      <img
                        className="rounded-circle shadow-1-strong me-3"
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(33).webp"
                        alt="avatar"
                        width="40"
                        height="40"
                      />
                      <div className="form-outline w-100">
                        <textarea
                          className="form-control"
                          id="textAreaExample"
                          rows="4"
                          onChange={(e) => setDataComment(e.target.value)}
                          required
                        ></textarea>
                      </div>
                    </div>
                    <div className="float-end mt-2 pt-1">
                      <button type="submit" className="btn btn-primary btn-sm">
                        Добавить комментарий
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm"
                      >
                        Отмена
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
