import { Container } from "react-bootstrap";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import firebase from '../../services/firebaseConnection';
import './articles.css';
import appConfig from '../../config.json';
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import Article from "../../components/Article";
import { format } from "date-fns";

export default function Articles() {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [lastDocs, setLastDocs] = useState();

    const listRef = firebase.firestore().collection('articles').orderBy('created', 'desc');

    useEffect(() => {

        loadArticles();

        return () => {

        }

    }, [])

    async function loadArticles() {
        await listRef.limit(5)
        .get()
        .then((snapshot) => {
            updateState(snapshot);
        })
        .catch((error) => {
            console.log("Erro ao carregar artigos: ", error);
            setLoadingMore(false);
            setLoading(false);
        })

        setLoading(false);
    }

    async function updateState(snapshot) {
        const isCollecttionEmpty = snapshot.size === 0;

        if (!isCollecttionEmpty) {
            let articleList = [];

            snapshot.forEach((doc) => {
                articleList.push({
                    id: doc.id,
                    created: doc.data().created,
                    createdFormated: format(doc.data().created.toDate(), 'dd/MM/yyyy HH:mm:ss'),
                    title: doc.data().title,
                    authors: doc.data().authors,
                    abstract: doc.data().abstract,
                    articleUrl: doc.data().articleUrl
                })
            })

            const lastDoc = snapshot.docs[snapshot.docs.length -1];
            setArticles(prevArticles => [...prevArticles, ...articleList]);
            setLastDocs(lastDoc);
        } else {
            setIsEmpty(true);
        }

        setLoadingMore(false);
        setLoading(false);
    }

    async function handleMore() {
        setLoadingMore(true);
        await listRef.startAfter(lastDocs).limit(5)
        .get()
        .then((snapshot) => {
            updateState(snapshot);
        })
    }

    return (
        <Container fluid className="articles-page">
            <Header />

            {!loading ? (
                <Container className="articles">
                    {articles.map( (article, index) => {
                        return (
                            <Article 
                                key={index}
                                article={article}
                                articlePage={false}
                            />
                        );
                    })}
                    {loadingMore && <p style={{ textAlign: 'center', marginTop: 15 }}>Buscando artigos...</p>}
                    { !loadingMore && !isEmpty && <Button variant="link" onClick={handleMore}>Ver mais artigos</Button>}
                </Container>
            ) : (
                <div style={{ height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <span style={{ fontWeight: '600', fontSize: '1.5rem',  }}>Carregando artigos...</span>
                </div>
            )}

            <Footer />

        </Container>
    );
}