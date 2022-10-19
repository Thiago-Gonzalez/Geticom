
import { Link } from 'react-router-dom';

import './adminheader.css';

import avatar from '../../assets/img/avatar.png';

import { BiUserPlus } from 'react-icons/bi';
import { FiHome } from "react-icons/fi";
import { MdOutlineArticle, MdHighlight } from 'react-icons/md';
import { GiExitDoor } from 'react-icons/gi';
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

            <Link to="/admin/destaques">
                <MdHighlight color="#FFF" size={24} /> 
                Destaques
            </Link>
            <Link to="/admin/artigos">
                <MdOutlineArticle color="#FFF" size={24} /> 
                Artigos
            </Link>
            {user.email === process.env.REACT_APP_ADMIN_EMAIL &&
                <Link to="/admin/cadastrar-admin">
                    <BiUserPlus color="#FFF" size={24} />
                    Cadastrar usuário
                </Link>
            }
            <Button className='signout-btn' onClick={() => signOut()}><GiExitDoor color='#FFF' size={24} />{loadingSignOut ? 'Saindo...' : 'Sair'}</Button>
        </div>
    );
}