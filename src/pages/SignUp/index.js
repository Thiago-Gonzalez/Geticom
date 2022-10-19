
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/auth';

import AdminHeader from '../../components/AdminHeader';
import Title from '../../components/Title';
import './signup.css';


import { BiUserPlus } from "react-icons/bi";


import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

export default function Admin() {
    const { user, setUser, signUp, loadingAuth } = useContext(AuthContext);


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        if (name !== '' && email !== '' && password !== '') {
            if (password === passwordConfirmation) {
                signUp(email, password, name);
                setEmail('');
                setName('');
                setPassword('');
                setPasswordConfirmation('');
            } else {
                toast.warning("As senhas devem coincidir!");
            }
        } else if (name === '' || email === '' || password === '') {
            toast.warning('Preencha todos os campos!');
        }
    }


    return(
        <div className='admin'>
            <AdminHeader />

            <div className='content'>
                <Title name="Cadastrar novo admin">
                    <BiUserPlus size={25} />
                </Title>

                <div className='special-container'>
                    <form className="form-register-adm" onSubmit={handleSubmit}>

                        <input type="text" placeholder="Nome" value={name} onChange={ (e) => setName(e.target.value) } />
                        <input type="text" placeholder='Email' value={email} onChange={ (e) => setEmail(e.target.value)} />
                        <input type="password" placeholder='Senha'  value={password} onChange={ (e) => setPassword(e.target.value)} />
                        <input type="password" placeholder='Confirme sua senha'  value={passwordConfirmation} onChange={ (e) => setPasswordConfirmation(e.target.value)} />
                        <Button type='submit' onClick={handleSubmit}>{loadingAuth ? 'Cadastrando...' : 'Cadastrar'}</Button>
                    
                    </form>
                </div>

            </div>
        </div>
    );
}