import {  Container, Row } from "react-bootstrap";
import ServiceCard from "../ServiceCard";
import './style.css';

export default function ServicesAndResearches (props) {
    return (
        <div className="services">
            <Container>
                <h2>Serviços</h2>
                <Row>
                    {props.services.map((service) => {
                        return (
                            <ServiceCard
                                service={service}    
                            />
                        );
                    })}
                </Row>
                <p className="services-obs1">Empresas parceiras podem contar com serviços de avaliação de tecnologias, desenvolvimento de estratégias de otimização operacional de recursos tecnológicos, apoio e suporte a processos licitatórios e de atendimento a normas de telecomunicações e treinamentos in company para formação ou aperfeiçoamento de pessoal</p>
                <p className="services-obs2">Além de soluções corporativas, o GETICOM trabalha com pesquisas nas seguintes áreas das ciências e tecnologias:</p>
                <Row>
                    {props.researches.map((research) => {
                        return (
                            <ServiceCard 
                                service={research}
                            />
                        );
                    })}
                </Row>
            </Container>
        </div>
    );
}