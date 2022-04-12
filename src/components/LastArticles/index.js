import { useContext } from "react";
import { Button } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { ArticlesContext } from "../../contexts/articles";
import Article from "../Article";

import './lastarticles.css';

export default function LastArticles() {
    const history = useHistory();
    const { articles } = useContext(ArticlesContext);

    return(
        <Container className="last-articles">
            <h1>Últimos artigos</h1>
            {articles.slice(0, 3).map( (article, index) => {
                return (
                    <Article
                        key={index}
                        article={article}
                        summary={true}
                    />
                );
            })}
            <Button variant="link" onClick={() => history.push("/artigos")}>Ler mais artigos</Button>
        </Container>
    );
}