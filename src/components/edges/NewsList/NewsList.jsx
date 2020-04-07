import React from "react";
import cx from "classnames";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Card, { CardImage, CardTaxonomy, CardTitle, CardMeta } from "../../Card";
import NewsMetaData from "../../NewsMetaData";

import styles from "./NewsList.module.scss";

// A graphql query here documents the shape of the data even if one isn't using TypeScript
// const NEWS_QUERY = gql`
//     {
//         listNewsItems {
//             results {
//                 title
//                 taxonomy
//                 status
//                 pageLink
//                 publishedDate
//                 primaryImage {
//                     imagePath
//                     imageDescription
//                 }
//                 author {
//                     id
//                     name
//                 }
//             }
//         }
//     }
// `;

export const NewsList = ({ className, ...rest }) => {
    // const { data, loading, error } = useQuery(NEWS_QUERY);
    // Inserting mock data for example
    const data = {
        listNewsItems: {
            results: [
                {
                    title:
                        "A really long heading that can wrap onto at least 3 lines",
                    taxonomy: "Commentary",
                    status: "New",
                    pageLink: "/news/123",
                    publishedDate: 1586036192428,
                    primaryImage: {
                        imagePath: "https://via.placeholder.com/340x192",
                        imageDescription: "A Placeholder",
                    },
                    author: {
                        id: 1,
                        name: "Kurt Vonnegut",
                    },
                },
                {
                    title: "A shorter heading",
                    taxonomy: "Hyperbole",
                    status: "New",
                    pageLink: "/news/124",
                    publishedDate: 1586036192429,
                    primaryImage: {
                        imagePath: "https://via.placeholder.com/340x192",
                        imageDescription: "A Placeholder",
                    },
                    author: {
                        id: 1,
                        name: "Elmore Leonard",
                    },
                },
            ],
        },
    };
    const outPutNews = React.useCallback(
        (newsItems) =>
            newsItems.map((newsItem, index) => (
                <li key={`news-${index}`}>
                    {/* We can use our style prop to suggest to the Card how much spacing it should use, or pass it a theme */}
                    <Card className={styles.card} uri={newsItem.pageLink}>
                        <CardImage
                            className={styles.cardImage}
                            uri={newsItem.primaryImage.imagePath}
                            alt={newsItem.primaryImage.imageDescription}
                        />
                        {/* NOTE: The wrapping boundary that represents both the media and the text content 
                            is not the responsibility of the outer layout context */}
                        <CardTaxonomy>
                            {/* We can put what ever structure of content we want into the taxonomy */}
                            <span className={styles.warning}>Sold out</span>
                            <span>Commentary</span>
                        </CardTaxonomy>
                        {/* We get to set the heading level... */}
                        <CardTitle>
                            <h3 className={styles.heading}>{newsItem.title}</h3>
                        </CardTitle>
                        {/* By looking at responsibility, we can see that the meta is only a layout; the 
                            content is defined by the knowledge of the data */}
                        <CardMeta>
                            <NewsMetaData
                                publishedDate={newsItem.publishedDate}
                                author={newsItem.author}
                            />
                        </CardMeta>
                    </Card>
                </li>
            )),
        []
    );

    // assume checks for loading and error etc here

    return (
        <>
            {data && data.listNewsItems.results.length ? (
                <ul className={cx(className, styles.edge)} {...rest}>
                    {outPutNews(data.listNewsItems.results)}
                </ul>
            ) : (
                <p>Shockingly, there is no news right now!</p>
            )}
        </>
    );
};
