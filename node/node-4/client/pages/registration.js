import Header from "../components/header";
import Head from "next/head";
import styles from "../styles/registration.module.css";
import { useState } from "react";
import Router from "next/router";

export default function Registation({ posts }) {
  const [data, setData] = useState({});
  const handler = async (e) => {
    await e.preventDefault();
    await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(async (result) => {
        document.cookie = await `authorization=${result.token};path=/`;
        Router.push("/");
      });
  };
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <title>Вход / Регистрация</title>
        <meta
          name="description"
          content="Образовательная платформа с возможностью смотреть и редактировать медиа контент"
        />
      </Head>
      <Header />
      <main className={styles["reg-wrapper"]}>
        <div className={styles["reg-title"]}>Вход / Регистрация</div>
        <div>
          <form onSubmit={handler} className={styles["reg-form-wrapper"]}>
            <div className={styles["reg-from-input"]}>
              <label htmlFor="username">Имя пользователя:</label>
              <input
                type="text"
                id="username"
                name="username"
                required
                onChange={(e) => setData({ ...data, username: e.target.value })}
              />
            </div>
            <div className={styles["reg-from-input"]}>
              <label htmlFor="password">Пароль:</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                minLength="6"
                maxLength="10"
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>
            <button type="submit" className={styles["reg-from-btn"]}>
              Войти
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
