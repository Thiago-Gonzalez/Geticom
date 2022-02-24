import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import './style.css';

export default function LastArticles (props) {
    return(
        <div className="last-articles">
            <Container>
                <h2>Últimos artigos</h2>
                {props.articles.slice(-3).reverse().map( (article) => {
                    return (
                        <>
                            <h4><Link to={`/artigos/${article.title.replaceAll(" ", "-")}`}>{article.title}</Link></h4>
                            <p>{article.summary} <Link to={`/artigos/${article.title.replaceAll(" ", "-")}`}>Ler artigo</Link></p>
                        </>
                    );
                })}
                <Link to="/artigos"><Button variant="link">Ler mais artigos</Button></Link>
            </Container>
        </div>
    );
}