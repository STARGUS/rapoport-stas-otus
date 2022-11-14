import Pencil from "../img/pencil";
import Trash from "../img/trash";
import React, { useState } from "react";

export default function CommentLessonItem({
  el,
  index,
  user,
  course_id,
  author_id,
  lesson_id,
}) {
  const [activeEdit, setActiveEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState({});
  const [dataEditDelete, setDataEditDelete] = useState("");
  const handelSubmit = async (e) => {
    await e.preventDefault();
    const cookies = document.cookie.split("authorization=")[1];
    const result = await fetch(
      `http://localhost:3001/course/${course_id}/lesson/${lesson_id}/comment/${dataEdit._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          authorization: "Bearer " + cookies,
        },
        body: JSON.stringify({ comment: dataEdit.body }),
      }
    );
    if (result.ok) {
      window.location.reload();
    } else {
      const newRes = await result.json();
      alert("Ошибка! " + newRes.error);
    }
  };
  const deleteComment = async () => {
    const cookies = document.cookie.split("authorization=")[1];
    const result = await fetch(
      `http://localhost:3001/course/${course_id}/lesson/${lesson_id}/comment/${dataEditDelete}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          authorization: "Bearer " + cookies,
        },
        body: JSON.stringify({}),
      }
    );
    if (result.ok) {
      window.location.reload();
    } else {
      const newRes = await result.json();
      alert("Ошибка! " + newRes.error);
    }
  };
  return (
    <div className="card-body" key={index + "card-body"}>
      <div className="d-flex flex-start align-items-center">
        <img
          className="rounded-circle shadow-1-strong me-3"
          src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp"
          alt="avatar"
          width="60"
          height="60"
        />
        <div>
          <h6 className="fw-bold text-primary mb-1">
            {el.author}
            {!!user && user.username === el.author && (
              <>
                <pem
                  onClick={async () => {
                    if (!activeEdit) {
                      await setActiveEdit(!activeEdit);
                      await setDataEdit(el);
                    } else {
                      await setActiveEdit(!activeEdit);
                    }
                  }}
                >
                  <Pencil />
                </pem>
                <pem
                  onClick={() => {
                    setDataEditDelete(el._id);
                    deleteComment();
                  }}
                >
                  <Trash />
                </pem>
              </>
            )}
          </h6>
          <p className="text-muted small mb-0">Shared publicly - {el.date}</p>
        </div>
      </div>
      {activeEdit ? (
        <form onSubmit={handelSubmit}>
          <textarea
            className="form-control"
            id="putComment"
            rows="4"
            value={dataEdit.body}
            onChange={(e) => setDataEdit({ ...dataEdit, body: e.target.value })}
            required
          ></textarea>
          <button type="submit">Применить</button>
        </form>
      ) : (
        <p className="mt-3 mb-4 pb-2">{el.body}</p>
      )}
    </div>
  );
}
