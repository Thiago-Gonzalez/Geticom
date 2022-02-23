import Header from '../../components/Header';
import Highlights from '../../components/Highlights';
import { Container } from 'react-bootstrap';
import '../style.css';
import Researchers from '../../components/Researchers';
import Footer from '../../components/Footer';
import Partnerships from '../../components/Partnerships';

export default function Home () {
    const headerContent = {
        "heading": "Grupo de Estudos em Tecnologias de Informação e Comunicações sem Fio",
        "paragraph": "Pesquisas nas áreas das ciências e tecnologias e consultoria para soluções em telecomunicações"
    };

    const highlights = [
        {
            "id": 1,
            "title": "CREA-MA recebe Academia Maranhense de Ciências para iniciar tratativas para parceria",
            "content": "O vice-presidente do CREA-MA, Eng. Eletric. Rogerio Moreira Lima, e o Superintendente Operacional, Eng. Amb. Sergio Silva,  receberam na última terça-feira (25) o Presidente da Academia Maranhense de Ciências, Eng. Civ. Henrique Mariano Amaral, e o 2º Secretário da AMC,  Eng. Mec. André Silva, a fim de tratarem sobre o  Termo de Cooperação Técnica que em breve será firmado pelas duas instituições. Na oportunidade foram discutidos projetos e ações em conjunto voltados para as engenharias, agronomia e geociências.",
            "imgPath": "./img/destaque-slide1.jpg"
        },
        {
            "id": 2,
            "title": "Dia do Agente Fiscal",
            "content": "Nosso reconhecimento aos profissionais que atuam na difícil missão de fiscalizar o exercício profissional e as atividades das engenharias, agronomia e geociências.",
            "imgPath": "./img/destaque-slide2.jpeg"
        }
    ];

    const coordinators = [
        {
            "id": 1,
            "name": "HENRIQUE MARIANO COSTA DO AMARAL",
            "img": "./img/mariano.jpg",
            "description": "Mestre em Engenharia de Computação e Sistemas pela Universidade Federal do Rio de Janeiro - UFRJ",
            "lattes": "http://lattes.cnpq.br/0524178426308330"
        },
        {
            "id": 2,
            "name": "LEONARDO HENRIQUE GONSIOROSKI",
            "img": "./img/leonardo.jpg",
            "description": "Pós-Doutorado pela PUC-Rio, Doutor em Telecomunicações pela PUC-Rio e Mestre em Engenharia Nuclear pelo Instituto Militar de Engenharia - IME | Coordenador do GETICOM",
            "lattes": "http://lattes.cnpq.br/5396107949326303"
        },
        {
            "id": 3,
            "name": "ROGÉRIO MOREIRA LIMA SILVA",
            "img": "./img/rogerio.jpg",
            "description": "Doutor em Telecomunicações pela PUC-Rio e Mestre em Telecomunicações pelo Instituto Militar de Engenharia - IME",
            "lattes": "http://lattes.cnpq.br/0490351544174740"
        },
        {
            "id": 4,
            "name": "LUIS CARLOS COSTA FONSECA",
            "img": "./img/luiscarlos.jpg",
            "description": "Doutor em Informática pela Universidade Federal do Rio Grande do Sul - UFRGS e Mestre em Ciência da Computação pela UFMA",
            "lattes": "http://lattes.cnpq.br/5011119718693303"
        }
    ]

    return (
        <Container fluid>
            <Header
             headerHeading={headerContent.heading} 
             headerParagraph={headerContent.paragraph}
            />

            <Highlights 
                highlights={highlights}
            />

            <Researchers
                coordinators={coordinators}
            />
            
            <Partnerships />

            <Footer />
        </Container>
    );
}