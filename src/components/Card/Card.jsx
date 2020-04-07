import React from "react";
import cx from "classnames";
import styles from "./Card.module.scss";

export const CardImage = ({ className, uri, alt, ...rest }) => {
    return (
        <figure className={cx(className, styles.imageWrap)}>
            <img alt={alt} src={uri} className={styles.image} {...rest} />
        </figure>
    );
};

export const CardTitle = ({ children, ...rest }) => <>{children}</>;
export const CardTaxonomy = ({ className, children, ...rest }) => (
    <p className={cx(className, styles.taxonomy)}>{children}</p>
);
export const CardMeta = ({ className, children, ...rest }) => (
    <div className={cx(className, styles.info)}>{children}</div>
);

const TextContent = ({ children }) => (
    <div className={styles.contentWrap}>{children}</div>
);

export const Card = ({ className, uri, children, ...rest }) => {
    const wrapChildren = React.useCallback(() => {
        const headerContent = [];
        const textContent = [];
        const otherContent = [];

        React.Children.map(children, (child) => {
            console.log(child.type.name, { children });

            if (
                child.type.name === "CardTaxonomy" ||
                child.type.name === "CardTitle"
            ) {
                return headerContent.push(child);
            }
            if (child.type.name === "CardMeta") {
                return textContent.push(child);
            }

            // if (child.type.name === "NewsMetaData") {
            //     return otherContent.push(
            //         React.cloneElement(child, {
            //             className: styles.metaText,
            //         })
            //     );
            // }

            return otherContent.push(child);
        });

        return [
            ...otherContent,
            <TextContent key="textContent">
                <header className={styles.heading}>{headerContent}</header>
                {textContent}
            </TextContent>,
        ];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [children]);

    return (
        <article className={cx(className, styles.component)} {...rest}>
            <a href={uri} className={styles.link}>
                {wrapChildren()}
            </a>
        </article>
    );
};
