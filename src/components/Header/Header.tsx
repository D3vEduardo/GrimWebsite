'use client'

import styles from "./Header.module.css";
import { useRealTimeUserData } from "@/contexts/RealTimeUserData/hook";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ConnectedAccounts from "../ConnectedAccounts/ConnectedAccounts";

export default function Header() {
    const userData = useRealTimeUserData();

    if (!userData) return null;

    return (
        <header
            className={styles.header}
        >
            <section
                className={styles.texts_container}
            >
                <h1>{userData.discord_user.global_name}</h1>
                <h2>
                    <Markdown remarkPlugins={[remarkGfm]}>
                        {userData.kv["description"]}
                    </Markdown>
                </h2>
            </section>
            <ConnectedAccounts />
        </header>
    )
}