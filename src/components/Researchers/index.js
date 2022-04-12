import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Coordinators from "../Coordinators";

import appConfig from '../../config.json';

import './researches.css';

export default function Researchers() {
    const history = useHistory();


    return(
        <div className="researchers">
             <h1>Pesquisadores</h1>

            <Coordinators 
                coordinators={appConfig.coordinators} 
            />

            <Button variant="link" onClick={() => history.push("/sobre")}>Equipe</Button>
        </div>
    );
}