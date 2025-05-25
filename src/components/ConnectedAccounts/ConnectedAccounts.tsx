'use client'

import { socialIconsProps } from "@constants";
import { socialIconKeyType } from "@/types/socialMediaIconTypes";
import { useRealTimeUserData } from "@/contexts/RealTimeUserData/hook"
import { Icon } from "@iconify/react";
import styles from "./ConnectedAccounts.module.css";

export default function ConnectedAccounts() {
    const userData = useRealTimeUserData();
    if (!userData?.kv.connected_accounts) return null;

    return (
        <ul
            className={styles.connected_accounts}
        >
            {
                userData.kv.connected_accounts.map((account, index) => (
                    <li
                    className={styles.account}
                    onClick={() => window.open(account.url)}
                    key={account.icon + index}>
                        <Icon {...socialIconsProps[account.icon as socialIconKeyType]} />
                    </li>
                ))
            }
        </ul>
    )
}