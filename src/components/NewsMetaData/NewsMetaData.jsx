import React from "react";
import styles from "./NewsMetaData.module.scss";

export const formatLocalDateTime = (date) => new Date(date).toISOString();

export const formatLongDate = (date) => {
    const formatter = new Intl.DateTimeFormat("en-gb", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    const jsDate = new Date(date);

    return formatter.format(jsDate);
};
export const NewsMetaData = ({ publishedDate, author = null }) => (
    <>
        <time
            dateTime={formatLocalDateTime(publishedDate)}
            className={styles.date}
        >
            {formatLongDate(publishedDate)}
        </time>{" "}
        {author ? (
            <span className={styles.section}>
                {" "}
                / By <strong className={styles.link}>{author.name}</strong>
            </span>
        ) : null}
    </>
);
