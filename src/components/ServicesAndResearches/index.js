import {  Container, Row } from "react-bootstrap";
import ServiceCard from "../ServiceCard";
import './servicesandresearches.css';

import { HiOutlineDocumentDownload } from 'react-icons/hi';

import cursoRF from '../../assets/courses/cursoRF.pdf';

export default function ServicesAndResearches ({ services, researches }) {
    

    return (
        <Container className="services">
            <h1>Serviços</h1>
            
            <div className="enterprise-services">
                <Row>
                    {services.map((service, index) => {
                        return (
                            <ServiceCard
                                service={service}   
                                key={index} 
                            />
                        );
                    })}
                </Row>
            </div>

            
            <div className="partner-companies">
                <p >Empresas parceiras podem contar com serviços de avaliação de tecnologias, desenvolvimento de estratégias de otimização operacional de recursos tecnológicos, apoio e suporte a processos licitatórios e de atendimento a normas de telecomunicações e treinamentos in company para formação ou aperfeiçoamento de pessoal</p>
            </div>


            <h2>Além de soluções corporativas, o GETICOM trabalha com pesquisas nas seguintes áreas das ciências e tecnologias:</h2>
            <Row>
                {researches.map((research, index) => {
                    return (
                        <ServiceCard
                            service={research}
                            key={index}
                        />
                    );
                })}
            </Row>

            <div className="course">
                <h1>Curso de Rádio Frequência (RF)</h1>
                <p className="course-paragraph">Estamos vivenciando uma verdadeira revolução das comunicações móveis. As tecnologias de 5G, Wi-Fi 6.0, IoT, TV 3.0, V2V são estratégicas para economia mundial e serão responsáveis em proporcionar uma infinidade de oportunidades de novos negócios em termos de produtos e serviços com estimativa de criação de 22 milhões de empregos em todo o mundo.</p>
                <p className="course-paragraph">A Engenharia de Rádio Frequência (RF) é responsável pelo planejamento e projeto da interface aérea destes sistemas. Este curso ajudará você a iniciar e construir uma carreira na área de RF com uma estratégia pedagógica avançada, pautada na resolução de problemas e utilizada nas melhores universidades do mundo.</p>
                <p className="course-paragraph">Com o processo de aprendizagem do básico ao avançado, o curso fornecerá os fundamentos de telecomunicações, programação e de inteligência artificial que permitirão o aluno entender os principais sistemas de comunicações móveis atuais e de próxima geração, além de capacitar o aluno a utilizar equipamentos sofisticados necessários para projetar e resolver problemas de RF nas diversas faixas de frequência utilizadas pelas atuais e futuras tecnologias de comunicações móveis.</p>
                <p className="course-paragraph">Seja um profissional de RF e faça parte da construção do futuro!</p>
                <img src={require('../../assets/img/cursoRFBanner.png')} alt="curso-rf-banner" />
                <a href={cursoRF} download="cursoRF"><HiOutlineDocumentDownload size={24} /> Baixar folder do curso</a>
            </div>
        </Container>
    );
}