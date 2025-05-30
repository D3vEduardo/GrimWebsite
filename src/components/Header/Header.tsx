"use client";

import styles from "./Header.module.css";
import { useRealTimeUserData } from "@/contexts/RealTimeUserData/hook";
import ConnectedAccounts from "../ConnectedAccounts/ConnectedAccounts";
import PopText from "@components/PopText/PopText";

export default function Header() {
  const userData = useRealTimeUserData();

  if (!userData) return null;

  return (
    <header className={styles.header}>
      <section className={styles.texts_container}>
        <PopText
          wrapper="h1"
          text={userData.discord_user.global_name || "Grim"}
          wordsSpace={6}
        />
        <PopText
          wrapper="h2"
          text={userData.kv["description"]}
          separator={" "}
          duration={0.05}
        />
      </section>
      <ConnectedAccounts />
    </header>
  );
}
