import cnpq from "../../assets/img/cnpq.jpg";
import fapema from "../../assets/img/fapema.jpg";
import pecs from "../../assets/img/pecs.jpg";
import engcomp from "../../assets/img/engcomp.png";
import usp from "../../assets/img/usp.jpg";
import ifam from "../../assets/img/ifam.jpg";
import fapead from "../../assets/img/fapead.jpg";
import abtelecom from "../../assets/img/abtelecom.jpg";
import fiema from "../../assets/img/fiema.jpg";
import celplan from "../../assets/img/celplan.jpg";
import lig16 from "../../assets/img/lig16.jpg";
import cisco from "../../assets/img/cisco.jpg";
import anatel from "../../assets/img/anatel.jpg";
import tvn from "../../assets/img/tvn.jpg";
import cla from "../../assets/img/cla.jpg";
import crea from "../../assets/img/crea.jpg";
import { Container} from "react-bootstrap";
import './partnerships.css';

export default function Partnerships() {
    const partnershipsLogos = [cnpq, fapema, pecs, engcomp, usp, ifam, fapead, abtelecom, fiema, celplan, lig16, cisco, anatel, tvn, cla, crea];

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