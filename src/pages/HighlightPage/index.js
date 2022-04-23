import { Container } from "react-bootstrap";
import appConfig from '../../config.json';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import NotFound from "../NotFound";
import { useParams } from "react-router-dom";
import './highlight.css';
import Highlight from "../../components/Highlight";
import { useEffect, useState } from "react";
import firebase from '../../services/firebaseConnection';
import { format } from "date-fns";

export default function HighlightPage () {
    const { id, title } = useParams();

    const [highlight, setHighlight] = useState({});
    const [found, setFound] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadHighlightById() {
            await firebase.firestore().collection('highlights').doc(id)
            .get()
            .then((snapshot) => {
                let data = {
                    id: snapshot.id,
                    created: snapshot.data().created,
                    createdFormated: format(snapshot.data().created.toDate(), 'dd/MM/yyyy HH:mm:ss'),
                    title: snapshot.data().title,
                    imgUrl: snapshot.data().imgUrl,
                    content: snapshot.data().content,
                    link: snapshot.data().link,
                    filesUrl: snapshot.data().filesUrl
                }

                setHighlight(data);
                setFound(true);
                setLoading(false);
            })
            .catch((error) => {
                console.log("Erro: destaque não encontrado. ", error);
                setFound(false);
                setLoading(false);
            })
        }

        loadHighlightById();

    }, [id])


    return (
        <>
            {found ? (

                <Container fluid className="highlight-page">
                    <Header 
                        heading={appConfig.headerContent.highlight.heading} 
                        paragraph={appConfig.headerContent.highlight.paragraph}
                    />

                    {loading ? (
                        <div style={{ height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <span style={{ fontWeight: '600', fontSize: '1.5rem',  }}>Carregando destaque...</span>
                        </div>
                    ) : (
                        highlight!== null &&
                            <Highlight
                                highlight={highlight}
                            />
                        
                    )}

                    <Footer />
                </Container>
            ) : (
                <NotFound/>
            )}
        </>
    );
}