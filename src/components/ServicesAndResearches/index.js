import {  Container } from "react-bootstrap";
import ServiceCard from "../ServiceCard";
import './servicesandresearches.css';

import { HiOutlineDocumentDownload } from 'react-icons/hi';

import cursoRF from '../../assets/courses/cursoRF.pdf';

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { useEffect, useState } from "react";

import useWindowDimensions from '../../utils/useWindowDimensions';
import SectionTitle from "../SectionTitle";

export default function ServicesAndResearches ({ services, researches }) {
    const [perView1, setPerView1] = useState();
    const [perView2, setPerView2] = useState();

    const { width } = useWindowDimensions();

    useEffect(() => {
        if (width < 460) {
            setPerView1(1.25);
        } else if (width < 560) {
            setPerView1(1.5);
        } else if (width < 760) {
            setPerView1(1.75);
        } else if (width < 875) {
            setPerView1(2.25);
        } else if (width < 1200) {
            setPerView1(2.5);
        } else if (width < 1540) {
            setPerView1(3.5);
        } else {
            setPerView1(4.5);
        }
        
    }, [width])

    
    const sliderOptions1 = {
        loop: true,
        slides: {
          perView: perView1,
          spacing: 25
        }
    }
      
    const [sliderRef1, instanceRef1] = useKeenSlider(sliderOptions1);
    
    useEffect(() => {
        instanceRef1.current?.update({
            ...sliderOptions1
        });
    }, [instanceRef1, sliderOptions1]);

    useEffect(() => {
        if (width < 460) {
            setPerView2(1.25);
            setLoopSlider2(true);
        } else if (width < 675) {
            setPerView2(1.5);
            setLoopSlider2(true);
        } else if (width < 950) {
            setPerView2(2.25);
            setLoopSlider2(true);
        } else {
            setPerView2(3);
            setLoopSlider2(false);
        }
        
    }, [width])

    const [loopSlider2, setLoopSlider2] = useState(false);

    const sliderOptions2 = {
        loop: loopSlider2,
        slides: {
            perView: perView2,
            spacing: 25
        }
    }

    const [sliderRef2, instanceRef2] = useKeenSlider(sliderOptions2);

    useEffect(() => {
        instanceRef2.current?.update({
            ...sliderOptions2
        });
    }, [instanceRef2, sliderOptions2]);

    return (
        <Container className="services">
            <div className="enterprise-services">
                <SectionTitle>Serviços</SectionTitle>

                <div className="partner-companies">
                    <p>Empresas parceiras podem contar com serviços de avaliação de tecnologias, desenvolvimento de estratégias de otimização operacional de recursos tecnológicos, apoio e suporte a processos licitatórios e de atendimento a normas de telecomunicações e treinamentos in company para formação ou aperfeiçoamento de pessoal</p>
                </div>

                <div ref={sliderRef1} className="keen-slider enterprise-services-slider">
                    {services.map((service, index) => {
                        return (
                            <ServiceCard
                                key={index}
                                service={service}   
                                slideNum={index}
                            />
                        );
                    })}
                </div>
            </div>

            <div className="research-services">
                <h2>Além de soluções corporativas, o GETICOM trabalha com pesquisas nas seguintes áreas das ciências e tecnologias:</h2>
                <div ref={sliderRef2} className="keen-slider research-services-slider">
                    {researches.map((research, index) => {
                        return (
                            <ServiceCard
                                key={index}
                                service={research}
                                slideNum={index}
                            />
                        );
                    })}
                </div>
            </div>

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