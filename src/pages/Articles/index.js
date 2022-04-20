import { Container } from "react-bootstrap";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

import './articles.css';
import appConfig from '../../config.json';
import { Button } from "react-bootstrap";
import { useContext } from "react";
import { ArticlesContext } from "../../contexts/articles";
import Article from "../../components/Article";

export default function Articles() {

    const { articles } = useContext(ArticlesContext);

    return (
        <Container fluid className="articles-page">
            <Header 
                heading={appConfig.headerContent.articles.heading}
                paragraph={appConfig.headerContent.articles.paragraph}
            />

            <Container className="articles">
                {articles.map( (article, index) => {
                    return (
                        <Article 
                            index={index}
                            article={article}
                            articlePage={false}
                        />
                    );
                })}
                <Button variant="link">Ver mais artigos</Button>
            </Container>

            <Footer />

        </Container>
    );
}