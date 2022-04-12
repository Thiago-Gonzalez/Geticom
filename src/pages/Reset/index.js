import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

import logo from '../../assets/img/geticom-logo.png';

import firebase from '../../services/firebaseConnection';

import './reset.css';
import { useHistory } from "react-router-dom";
import { useState } from "react";

export default function Reset() {

    const [email, setEmail] = useState('');
    const [loadingReset, setLoadingReset] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        setLoadingReset(true);

        await firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                setEmail('');
                setLoadingReset(false);
                history.push('/admin/login');
                toast.success('Um email de redefinição de senha foi enviado para ' + email);
            })
            .catch((error) => {
                
                if (error.code === 'auth/invalid-email') {
                    toast.error("Email inválido!");
                } else if (error.code === 'auth/user-not-found') {
                    toast.error("Usuário não encontrado! Verifique se suas credenciais estão corretas.");
                } else {
                    toast.error("😕Ops, ocorreu um erro inesperado ao redefinir sua senha");
                }
                setLoadingReset(false);
            })
    }

    return(
        <div className="reset-page">
            <div className='reset'>
                <div className='reset-area'>
                    <img src={logo} alt="Geticom Logo" />
                </div>

                <form onSubmit={handleSubmit}>
                    <h1>Redefinir senha</h1>
                    <input type="text" placeholder='Email' value={email} onChange={ (e) => setEmail(e.target.value)} />
                    <button type='submit'>{loadingReset ? 'Carregando...' : 'Próximo'}</button>
                </form>
                <Button type="link" className="return-btn" onClick={() =>  history.push("/admin/login")}>Retornar</Button>
            </div>
        </div>
    );
}