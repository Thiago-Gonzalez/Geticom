import {  Container, Row } from "react-bootstrap";
import ServiceCard from "../ServiceCard";
import './servicesandresearches.css';

export default function ServicesAndResearches ({ services, researches }) {
    return (
        <Container className="services">
            <h1>Serviços</h1>
            <Row>
                {services.map((service) => {
                    return (
                        <ServiceCard
                            service={service}    
                        />
                    );
                })}
            </Row>

            
            <div className="partner-companies">
                <p >Empresas parceiras podem contar com serviços de avaliação de tecnologias, desenvolvimento de estratégias de otimização operacional de recursos tecnológicos, apoio e suporte a processos licitatórios e de atendimento a normas de telecomunicações e treinamentos in company para formação ou aperfeiçoamento de pessoal</p>
            </div>


            <h2>Além de soluções corporativas, o GETICOM trabalha com pesquisas nas seguintes áreas das ciências e tecnologias:</h2>
            <Row>
                {researches.map((research) => {
                    return (
                        <ServiceCard
                            service={research}
                        />
                    );
                })}
            </Row>
        </Container>
    );
}