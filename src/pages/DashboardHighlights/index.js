import { useContext } from "react";
import AdminHeader from "../../components/AdminHeader";
import Title from "../../components/Title";
import { HighlightsContext } from "../../contexts/highlights";

import { MdOutlineHighlight } from 'react-icons/md';
import { FiEdit2 } from 'react-icons/fi';

import './dashboardhighlights.css';
import { Link } from "react-router-dom";

export default function DashboardHighlights() {
    const { highlights } = useContext(HighlightsContext);

    return(
        <div className="dashboard">
            <AdminHeader />

            <div className="content">
                <Title name="Destaques">
                    <MdOutlineHighlight size={25} /> 
                </Title>

                {highlights.length !== 0 ? (
                    <>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">Título</th>
                                    <th scope="col">Cadastrado em</th>
                                    <th scope="col">#</th>
                                </tr>
                            </thead>
                            <tbody>
                                {highlights.map((highlight, index) => {
                                    return(
                                        <tr key={index}>
                                            <td data-label="Título" className="td-title">{highlight.title}</td>
                                            <td data-label="Cadastrado em">20/04/2022</td>
                                            <td data-label="#">
                                                <Link className="action" style={{ backgroundColor: '#F6A935'}} to={`/compose/highlight/${highlight.id}`} >
                                                    <FiEdit2 color="#FFF" size={17} />
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>


                    </>
                ) : (
                    <div className="special-container">
                        <p>Nenhum destaque registrado</p>
                    </div>
                )}
            </div>
        </div>
    );
}