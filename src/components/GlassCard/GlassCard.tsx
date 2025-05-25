import styles from "./GlassCard.module.css";

type PropsType = {
    imageUrl: string;
    title: string;
    subtitle: string;
}

export default function GlassCard({
    imageUrl,
    title,
    subtitle
}: PropsType) {
    return (
        <figure
            className={styles.glass_card}
        >
            <img
            className={styles.glass_card_image}
            src={imageUrl}
            />
            <figcaption
                className={styles.glass_card_figcaption}
            >
                <h3
                    className={styles.glass_card_title}
                >
                    {title}
                </h3>
                <p
                    className={styles.glass_card_subtitle}
                >
                    {subtitle}
                </p>
            </figcaption>
        </figure>
    )
}