import Header from "../components/header";
import Head from "next/head";
import styles from "../styles/create-course.module.css";
import React, { useState } from "react";
import nookies from "nookies";

export default function CreateCourse({ user }) {
  const [fileName, setFileName] = useState("");
  const [data, setData] = useState({});
  const handler = async (e) => {
    await e.preventDefault();
    const cookies = document.cookie.split("authorization=")[1];
    await fetch("http://localhost:3001/create-course", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        authorization: "Bearer " + cookies,
      },
      body: JSON.stringify(data),
    });
  };
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <title>Создание своего курса</title>
        <meta
          name="description"
          content="Образовательная платформа с возможностью смотреть и редактировать медиа контент"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx"
          crossOrigin="anonymous"
        ></link>
      </Head>
      <Header user={user} />
      <main>
        <div>Создание курса</div>
        <div>
          <form onSubmit={handler}>
            <div className={styles["form-title"]}>
              <label>
                <input
                  name="title"
                  id="title"
                  placeholder="Название курса"
                  className={styles["form-title-input"]}
                  onChange={(e) => setData({ ...data, title: e.target.value })}
                  required
                />
              </label>
            </div>
            <div className={styles["form-file"]}>
              <div className={styles["form-group"]}>
                <label className={styles["label"]}>
                  <i className="material-icons">attach_file</i>
                  <span className={styles["title"]}>
                    {fileName ? fileName : "Добавить файл"}
                  </span>
                  <input
                    name="file"
                    id="file"
                    type="file"
                    onChange={(e) =>
                      setFileName(
                        e.target.value.split(`\\`)[
                          e.target.value.split(`\\`).length - 1
                        ]
                      )
                    }
                  />
                </label>
              </div>
              <div className={styles["form-group"]}>
                <label>
                  <textarea
                    name="description"
                    id="description"
                    placeholder="Описание к курсу"
                    className={styles["from-description"]}
                    required
                    onChange={(e) =>
                      setData({ ...data, description: e.target.value })
                    }
                  />
                </label>
              </div>
            </div>
            <label>
              <button type="submit" className="btn btn-outline-secondary">
                Создать
              </button>
            </label>
          </form>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context).authorization;
  const header = {
    headers: {
      authorization: "Bearer " + cookies,
    },
  };
  const data = await (
    await fetch("http://localhost:3001", cookies && header)
  )?.json();
  return {
    props: {
      data: data.data,
      user: data.user ? data.user : null,
    },
  };
}
