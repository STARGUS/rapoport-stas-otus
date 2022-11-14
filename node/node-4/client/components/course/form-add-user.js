import React, { useState } from "react";

export default function FormAddUser({ id, styles }) {
  const [formData, setFormData] = useState({});
  const [formDataActive, setFormDataActive] = useState(false);
  const handler = async (e) => {
    await e.preventDefault();
    const cookies = document.cookie.split("authorization=")[1];
    const result = await fetch(`http://localhost:3001/course/${id}/newrole`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        authorization: "Bearer " + cookies,
      },
      body: JSON.stringify(formData),
    });
    if (result.ok) {
      alert("Пользователь добавлен в базу");
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
        onClick={() => setFormDataActive(!formDataActive)}
      >
        Добавить пользователя для данного курса
      </button>
      {!!formDataActive && (
        <form onSubmit={handler} className={styles["course-item-form-wrapper"]}>
          <div>
            <label className={styles["course-item-form-label"]}>
              <input
                type="text"
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className={styles["course-item-form-input"]}
                placeholder="Имя пользователя с учетом регистра!"
                required
                minLength="4"
                maxLength="20"
              />
            </label>
            <button type="submit" className="btn btn-outline-secondary">
              Добавить
            </button>
          </div>
        </form>
      )}
    </>
  );
}
