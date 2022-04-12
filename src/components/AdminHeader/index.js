
import { Link } from 'react-router-dom';

import './adminheader.css';

import avatar from '../../assets/img/avatar.png';

import { BiUserPlus } from 'react-icons/bi';
import { FiHome } from "react-icons/fi";
import { MdOutlineArticle, MdMiscellaneousServices, MdHighlight } from 'react-icons/md';
import { RiTeamFill } from 'react-icons/ri';
import { TiContacts } from 'react-icons/ti';
import { GiExitDoor } from 'react-icons/gi';
import { BsFillMegaphoneFill } from 'react-icons/bs';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import { Button } from 'react-bootstrap';

export default function AdminHeader() {
    const { user, signOut, loadingSignOut } = useContext(AuthContext);

    return(
        <div className='sidebar'>
            <div>
                <img src={user.avatarUrl === null ? avatar : user.avatarUrl} alt="Foto avatar" />
            </div>

            <Link to="/admin">
                <FiHome color="#FFF" size={24} /> 
                Perfil
            </Link>

            <Link to="/admin/compose/highlights">
                <MdHighlight color="#FFF" size={24} /> 
                Destaques
            </Link>
            <Link to="/admin/compose/articles">
                <MdOutlineArticle color="#FFF" size={24} /> 
                Artigos
            </Link>
            <Link to="/admin/team">
                <RiTeamFill color="#FFF" size={24} /> 
                Equipe
            </Link>
            <Link to="/admin/services">
                <MdMiscellaneousServices color="#FFF" size={24} /> 
                Serviços
            </Link>
            <Link to="/admin/testimonials">
                <BsFillMegaphoneFill color="#FFF" size={24} /> 
                Testemunhos
            </Link>
            <Link to="/admin/contacts">
                <TiContacts color="#FFF" size={24} /> 
                Contatos
            </Link>
            <Link to="/admin/register">
                <BiUserPlus color="#FFF" size={24} />
                Cadastrar usuário
            </Link>
            <Button className='signout-btn' onClick={() => signOut()}><GiExitDoor color='#FFF' size={24} />{loadingSignOut ? 'Saindo...' : 'Sair'}</Button>
        </div>
    );
}