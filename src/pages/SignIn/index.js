import { Button } from "react-bootstrap";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

import logo from '../../assets/img/logo-geticom.png';
import { AuthContext } from "../../contexts/auth";

import './signin.css';
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

export default function SignIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signIn, loadingAuth } = useContext(AuthContext);

    const history = useHistory();


    function handleSubmit(e) {
        e.preventDefault();
        
        if (email !== '' && password !== '') {
            signIn(email, password);
        } else if (email === '' || password === '') {
            toast.warning('Preencha todos os campos!');
        }

    }

    function handleForgetPassword(e) {
        e.preventDefault();

        history.push("/admin/reset");
    }

    return(
        <div className="login-page">
            <div className='login'>
                <div className='login-area'>
                    <img src={logo} alt="Geticom Logo" />
                </div>

                <form onSubmit={handleSubmit}>
                    <h1>Entrar</h1>
                    <input type="text" placeholder='Email' value={email} onChange={ (e) => setEmail(e.target.value)} />
                    <input type="password" placeholder='Senha'  value={password} onChange={ (e) => setPassword(e.target.value)} />
                    <button type='submit'>{loadingAuth ? 'Carregando...' : 'Acessar'}</button>
                </form>
                <Button type="link" className="forget-password-btn" onClick={handleForgetPassword}>Esqueceu sua senha?</Button>
                <Link className="return-btn" to="/">Retornar</Link>
            </div>
        </div>
    );
}