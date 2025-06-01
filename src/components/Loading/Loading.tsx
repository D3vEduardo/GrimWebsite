"use client";
import styles from "./Loading.module.css";

export default function LoadingProvider() {
  return (
    <div className={styles.container}>
      <div className={`${styles.dash} ${styles.one}`}></div>
      <div className={`${styles.dash} ${styles.two}`}></div>
      <div className={`${styles.dash} ${styles.three}`}></div>
      <div className={`${styles.dash} ${styles.four}`}></div>
    </div>
  );
}
