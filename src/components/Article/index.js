import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import './article.css';

export default function Article({ article, summary }) {
    const history = useHistory();

    return (
        <div className="article">
            {summary ? (
                <>
                    <Link to={`/artigos/${article.id}/${article.title.replaceAll(" ", "-").toLowerCase()}`}><h2>{article.title}</h2></Link>
                    <p>{article.summary} <Link to={`/artigos/${article.id}/${article.title.replaceAll(" ", "-").toLowerCase()}`}>Ler artigo</Link></p>
                </>
            ) : (
                <>
                        <h1>{article.title}</h1>
                        <span>Publicado por Leonardo Gonsioroski em 20/02/2022</span>
                        <p>{article.content}</p>
                        <Button variant="link" onClick={() => history.push("/artigos")}>Retornar</Button>
                </>
            )}
        </div>
    );
}