import Image from "next/image";
import styles from "./GlassCard.module.css";
import { motion } from "motion/react";
import { Icon } from "@iconify/react";

type PropsType = {
  imageUrl: string;
  title: string;
  subtitle: string;
  delay?: number;
  spotify?: {
    trackId: string;
  };
  redirectUrl?: string;
};

export default function GlassCard({
  imageUrl,
  title,
  subtitle,
  delay = 0,
  spotify,
  redirectUrl,
}: PropsType) {
  return (
    <motion.a
      href={redirectUrl || "/"}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.glass_card}
      whileHover={{
        scale: 1.01,
        cursor: "pointer",
        boxShadow: "0 0 20px 0 rgba(54, 0, 69, 0.3)",
      }}
      transition={{
        duration: 0.2,
        ease: "easeInOut",
      }}
      initial={{
        translateY: 20,
        opacity: 0,
      }}
      animate={{
        translateY: 0,
        opacity: 1,
        transition: {
          delay,
          duration: 0.5,
          ease: "easeOut",
        },
      }}
    >
      <Image
        alt="Imagem do glass card"
        width={300}
        height={300}
        unoptimized
        className={styles.glass_card_image}
        src={imageUrl}
      />
      <figcaption className={styles.glass_card_figcaption}>
        <span style={{ display: "flex", gap: 2 }}>
          <h3 className={styles.glass_card_title}>{title}</h3>
          {
            spotify?.trackId && (
                <Icon icon="mingcute:spotify-fill" color="#1DB954" width={25} />
            )
          }
        </span>
        <p className={styles.glass_card_subtitle}>{subtitle}</p>
      </figcaption>
    </motion.a>
  );
}
