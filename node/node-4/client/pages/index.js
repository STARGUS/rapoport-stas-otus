import Head from "next/head";
import Header from "../components/header";
import styles from "../styles/index.module.css";
import Link from "next/link";
import nookies from "nookies";

export default function Home({ data, user }) {
  console.log(JSON.stringify(user));
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <title>Проект "my-courses"</title>
        <meta
          name="description"
          content="Образовательная платформа с возможностью смотреть и редактировать медиа контент"
        />
      </Head>
      <Header user={user} />
      <main>
        <div className={styles["course-wrapper"]}>
          {!!data &&
            data.map((el, index) => (
              <div className={styles["course-item"]} key={index + "course"}>
                <div className={styles["course-item-title"]}>{el.title}</div>
                <img
                  src={
                    !!el.photo
                      ? el.photo
                      : "https://mdbcdn.b-cdn.net/img/new/slides/040.webp"
                  }
                  className={styles["img-fluid"]}
                  alt="Wild Landscape"
                />
                <div className={styles["course-item-author"]}>
                  Автор: {el.author.name}
                </div>
                <button className={styles["course-item-btn"]}>
                  <a href={"/course/" + el._id}>Открыть</a>
                </button>
              </div>
            ))}
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
