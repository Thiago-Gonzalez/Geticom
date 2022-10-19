import cnpq from "../../assets/img/cnpq.jpg";
import fapema from "../../assets/img/fapema.jpg";
import pecs from "../../assets/img/pecs.jpg";
import engcomp from "../../assets/img/engcomp.png";
import fapead from "../../assets/img/fapead.jpg";
import abtelecom from "../../assets/img/abtelecom.jpg";
import fiema from "../../assets/img/fiema.jpg";
import lig16 from "../../assets/img/lig16.jpg";
import cisco from "../../assets/img/cisco.jpg";
import anatel from "../../assets/img/anatel.jpg";
import tvn from "../../assets/img/tvn.jpg";
import uff from "../../assets/img/uff.jpg";
import puc from "../../assets/img/pucrio.png";
import crea from "../../assets/img/crea.jpg";
import acm from "../../assets/img/academiamaranhense.png";
import { Container} from "react-bootstrap";
import './partnerships.css';

export default function Partnerships() {
    const partnershipsLogos = [cnpq, fapema, pecs, engcomp, fapead, abtelecom, fiema, lig16, cisco, anatel, tvn, uff, puc, crea, acm];

    return (
        <Container className="partnerships">
            <h1>PARCERIAS</h1>
            
            <div className="logos">
                {partnershipsLogos.map((logo, index) => {
                    return (
                        <img src={logo} key={index} alt="Logo de parceiro do GETICOM" />
                    );
                })}
            </div>
        </Container>
    );
}