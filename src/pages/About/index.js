import Header from '../../components/Header';
import Team from '../../components/Team';
import { Container } from 'react-bootstrap';
import Footer from '../../components/Footer';
import appConfig from '../../config.json';
import './about.css';
import SectionTitle from '../../components/SectionTitle';

export default function About () {

    return (
            <Container fluid className='about'>
                <Header />
                <div className='about-content'>
                    <SectionTitle>Sobre</SectionTitle>
                    <p>GETICOM é um núcleo de estudos em telecomunicações cuja missão é desenvolver tecnologia em comunicação sem fio, através da pesquisa acadêmica e aplicada, realizada por professores e alunos de graduação e pós-graduação da UEMA. Atuamos como ferramenta de apoio ao ensino-aprendizagem nas áreas de tecnologia da informação, telecomunicações e automação e controle. Além de oferecer consultoria para soluções em telecomunicações, promovida por profissionais experientes e com um preço abaixo do mercado</p>
                </div>
                <Team
                    coordinators={appConfig.coordinators}
                    researchers={appConfig.researchers}
                />
                <Footer />
            </Container>
    );
}