import Header from "../../components/header";
import Head from "next/head";
import styles from "../../styles/course-item.module.css";
import React from "react";
import nookies from "nookies";
import styles2 from "../../styles/create-course.module.css";
import Accordion from "../../components/accordion";
import FormAddUser from "../../components/course/form-add-user";
import CreateLesson from "../../components/course/create-lesson";

export default function CourseId({ data, user, id }) {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <title>Курс: {data.title}</title>
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
      <main className={styles["course-item-wrapper"]}>
        <>
          <div>Название курса: {data.title}</div>
          <div>Автор: {data.author.name}</div>
          <div>Описание: {data.description}</div>
          <Accordion
            lesson={data.lessons}
            user={user}
            course_id={data._id}
            author_id={data.author.id}
            data={data}
          />
          {!!data.edit && (
            <>
              <FormAddUser id={id} styles={styles} />
              <CreateLesson styles={styles2} course_id={id} />
            </>
          )}
        </>
      </main>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa"
        crossOrigin="anonymous"
      />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  const cookies = nookies.get(context).authorization;
  const header = {
    headers: {
      authorization: "Bearer " + cookies,
    },
  };
  const data = await (
    await fetch("http://localhost:3001/course/" + id, cookies && header)
  )?.json();
  console.log(data.lessons);
  return {
    props: {
      data: data.data,
      user: data.user ? data.user : null,
      id,
    },
  };
}
