import './footer.css';

import uema from "../../assets/img/uema-logo.png";

export default function Footer() {
    return (
        <footer className='colored-section'>
            <div className='footer'>
                <img src={uema} alt="Logo UEMA" />
                <div className='footer-info'>
                    <p>Grupo de Estudos em Tecnologias de Informação e Comunicações sem Fio | Todos os direitos reservados</p>
                    <p>Cidade Universitária Paulo VI, S/N - UEMA | 65055-000 | São Luís - MA</p>
                    <p>Tel.: (98) 9 8347-1218 - Prof. Leonardo Gonsioroski</p>
                    <p>email: leonardohgfs@hotmail.com</p>
                </div>
            </div>

            <div  className='footer-dev'>
                <p>© Desenvolvido por <a href="https://www.linkedin.com/in/thiago-gonzález/">Thiago González</a></p>
            </div>
        </footer>
    );
}