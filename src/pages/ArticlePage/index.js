import { Button } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import appConfig from '../../config.json';
import NotFound from "../NotFound";
import './article.css';
import Article from "../../components/Article";

import firebase from '../../services/firebaseConnection';
import { format } from "date-fns";
import { Redirect } from "react-router-dom";

export default function ArticlePage() {
    const { id, title } = useParams();

    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [found, setFound] = useState(true);
    
    useEffect(() => {

        async function loadArticleById() {
            await firebase.firestore().collection('articles').doc(id)
            .get()
            .then((snapshot) => {
                let data = {
                    id: snapshot.id,
                    created: snapshot.data().created,
                    createdFormated: format(snapshot.data().created.toDate(), 'dd/MM/yyyy HH:mm:ss'),
                    title: snapshot.data().title,
                    abstract: snapshot.data().abstract,
                    authors: snapshot.data().authors,
                    articleUrl: snapshot.data().articleUrl
                }

                setArticle(data);
                setLoading(false);
                setFound(true);
            })
            .catch((error) => {
                console.log('Erro ao carregar artigo com id ' + id + ': ', error);
                setLoading(false);
                setArticle(null);
                setFound(false);
            })
        }

        loadArticleById();

    }, [id])

    return (
        <>
            {found ? (
                <Container fluid className="article-page">
                    <Header />
                    
                    {loading ? (
                        <div style={{ height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <span style={{ fontWeight: '600', fontSize: '1.5rem',  }}>Carregando artigo...</span>
                        </div>
                    ) : (
                        article !== null &&
                            <Article 
                                article={article}
                                articlePage={true}
                            />
                        
                    )}

                    <Footer />
                </Container>
            ) : (
                <NotFound />
            )}
        </>
    );
}