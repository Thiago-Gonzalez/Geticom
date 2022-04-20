import { Button } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import appConfig from '../../config.json';
import { ArticlesContext } from "../../contexts/articles";
import NotFound from "../NotFound";
import './article.css';
import Article from "../../components/Article";

export default function ArticlePage() {
    const { id, title } = useParams();

    const { articles } = useContext(ArticlesContext);
    
    const articleSelected = articles.find( (article) => {
            return article.id === parseInt(id) && article.title.replaceAll(" ", "-").toLowerCase() === title.toLowerCase() ? article : undefined;
        });

    return (
        <>
            {articleSelected !== undefined ? (
                <Container fluid className="article-page">
                    <Header 
                        heading={appConfig.headerContent.articles.heading}
                        paragraph={appConfig.headerContent.articles.paragraph}
                    />
                    
                    <Article 
                        article={articleSelected}
                        articlePage={true}
                    />

                    <Footer />
                </Container>
            ) : (
                <NotFound />
            )}
        </>
    );
}