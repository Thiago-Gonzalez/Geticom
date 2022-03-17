import { useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Coordinators from "../Coordinators";
import './researchers.css';

export default function Researchers ({ coordinators }) {
    const history = useHistory();

    function redirectAbout() {
        history.push("/sobre");
    }

    return(
        <div className="researchers">
            <h1>Pesquisadores</h1>

            <Coordinators coordinators={coordinators} />

            <Button variant="link" onClick={redirectAbout}>Equipe</Button>
        </div>
    );
}