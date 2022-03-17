import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import './lastarticles.css';

export default function LastArticles ({ articles }) {
    return(
        <Container className="last-articles">
            <h1>Últimos artigos</h1>
            {articles.slice(-3).reverse().map( (article) => {
                return (
                    <>
                        <h2><Link to={`/artigos/${article.title.replaceAll(" ", "-")}`}>{article.title}</Link></h2>
                        <p>{article.summary} <Link to={`/artigos/${article.title.replaceAll(" ", "-")}`}>Ler artigo</Link></p>
                    </>
                );
            })}
            <Link to="/artigos"><Button variant="link">Ler mais artigos</Button></Link>
        </Container>
    );
}