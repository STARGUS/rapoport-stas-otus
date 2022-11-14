import React from "react";
import Link from "next/link";
import styles from "../styles/header.module.css";

export default function header({ user }) {
  return (
    <>
      <div className={styles["header-wrapper"]}>
        <a href="/">Главная</a>
        <a href="/create-course">Создать курс</a>
        <div className={styles["header-user"]}>
          {!!user ? (
            <a href="/registration">{user.username}</a>
          ) : (
            <a href="/registration">Вход/Регистрация</a>
          )}
        </div>
      </div>
    </>
  );
}
