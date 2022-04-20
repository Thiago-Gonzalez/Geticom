import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import './article.css';

import { HiOutlineDocumentDownload } from 'react-icons/hi';

export default function Article({ article, articlePage }) {
    const history = useHistory();

    return (
        <div className="article">
            {articlePage ? (
                <>
                    <h1>{article.title}</h1>
                    <span>Publicado por: {article.authors}</span>
                    <p>{article.summary}</p>
                    <a className="download-btn" href={require("../../assets/articles/SBRT18-1.pdf")} download><HiOutlineDocumentDownload size={24} /> Baixar artigo</a>
                    <Button variant="link" onClick={() => history.push("/artigos")}>Retornar</Button>
                </>
            ) : (
                <>
                    <Link to={`/artigos/${article.id}/${article.title.replaceAll(" ", "-").toLowerCase()}`}><h2>{article.title}</h2></Link>
                    <p>{article.summary}</p>
                    <a className="download-btn" href={require("../../assets/articles/SBRT18-1.pdf")} download><HiOutlineDocumentDownload size={24} /> Baixar artigo</a>
                </>
            )}
        </div>
    );
}