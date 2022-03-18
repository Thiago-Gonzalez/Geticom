import Header from '../../components/Header';
import Highlights from '../../components/Highlights';
import { Container } from 'react-bootstrap';
import Footer from '../../components/Footer';
import Partnerships from '../../components/Partnerships';
import LastVideos from '../../components/LastVideos';
import appConfig from '../../config.json';
import './home.css';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { ArticlesContext } from '../../contexts/articles';
import Article from '../../components/Article';
import Coordinators from '../../components/Coordinators';

export default function Home () {

    const history = useHistory();
    const { articles } = useContext(ArticlesContext);

    return (
        <Container fluid>
            <Header
                heading={appConfig.headerContent.home.heading} 
                paragraph={appConfig.headerContent.home.paragraph}
            />

            <Highlights 
                highlights={appConfig.highlights}
            />

            <div className="researchers">
                <h1>Pesquisadores</h1>

                <Coordinators coordinators={appConfig.coordinators} />

                <Button variant="link" onClick={() => history.push("/sobre")}>Equipe</Button>
            </div>

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

            <LastVideos />
            
            <Partnerships />

            <Footer />
        </Container>
    );
}