"use client";

import { socialIconsProps } from "@constants";
import { socialIconKeyType } from "@/types/socialMediaIconTypes";
import { useRealTimeUserData } from "@/contexts/RealTimeUserData/hook";
import { Icon } from "@iconify/react";
import styles from "./ConnectedAccounts.module.css";
import { motion } from "motion/react";

export default function ConnectedAccounts() {
  const userData = useRealTimeUserData();
  if (!userData?.kv.connected_accounts) return null;
  const descriptionWordsCount = userData.kv["description"]?.split(" ").length || 0;

  return (
    <ul className={styles.connected_accounts}>
      {userData.kv.connected_accounts.map((account, index) => (
        <motion.li
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.2, ease: "easeInOut", delay: 0 },
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: {
            delay: index * 0.16 + (descriptionWordsCount * 0.10),
            duration: 0.16,
            ease: "easeOut",
          } }}
          className={styles.account}
          onClick={() => window.open(account.url)}
          key={account.icon + index}
        >
          <Icon {...socialIconsProps[account.icon as socialIconKeyType]} />
        </motion.li>
      ))}
    </ul>
  );
}
