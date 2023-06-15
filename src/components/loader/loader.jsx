import React from "react";
import styles from "./loader.module.css";

function ClassicLoader({ type }) {
  return (
    <div className={styles.container}>
      {type === "white" && <div className={styles.whiteLoader}></div>}{" "}
      {type === "black" &&  <div className={styles.blackLoader}></div>}{" "}
      {type === "indigo" &&  <div className={styles.indigoLoader}></div>}{" "}
      {type === "red" &&  <div className={styles.redLoader}></div>}{" "}
    </div>
  );
}

export default ClassicLoader;
