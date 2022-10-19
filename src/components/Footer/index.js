import './footer.css';

import uema from "../../assets/img/uema-logo.png";

export default function Footer() {
    return (
        <footer className='colored-section'>
            <div className='footer'>
                <div className='footer-info-wrapper'>
                    <img className='logo-uema' src={uema} alt="Logo UEMA" />
                    <div className='footer-info'>
                        <p>Grupo de Estudos em Tecnologias de Informação e Comunicações sem Fio | Todos os direitos reservados</p>
                        <p>Cidade Universitária Paulo VI, S/N - UEMA | 65055-000 | São Luís - MA</p>
                        <p>Tel.: (98) 9 8347-1218 - Prof. Leonardo Gonsioroski</p>
                        <p>email: leonardohgfs@hotmail.com</p>
                    </div>
                </div>
                <div className='social'>
                    <a href='https://www.linkedin.com/in/geticom/' target="_blank">
                        <img className='social-logo' src="https://cdn.icon-icons.com/icons2/2699/PNG/96/linkedin_logo_icon_170234.png" alt="Linkedin logo" />
                    </a>
                    <a href='https://www.instagram.com/geticom.uema/' target="_blank">
                        <img className='social-logo' src="https://cdn.icon-icons.com/icons2/1584/PNG/512/3721672-instagram_108066.png" alt="Instagram logo" />
                    </a>
                </div>
            </div>

            <div  className='footer-dev'>
                <p>© Desenvolvido por <a href="https://www.linkedin.com/in/thiago-gonzález/">Thiago González</a></p>
            </div>
        </footer>
    );
}