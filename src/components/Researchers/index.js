import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Coordinators from "../Coordinators";
import './style.css';

export default function Researchers (props) {


    return(
        <div className="researchers">
            <Container>
                <h2>Pesquisadores</h2>
                <Coordinators coordinators={props.coordinators}/>
                <Link to="/sobre"><Button href="/sobre" variant="link">Equipe</Button></Link>
            </Container>
        </div>
    );
}