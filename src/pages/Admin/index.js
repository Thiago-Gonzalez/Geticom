import AdminHeader from "../../components/AdminHeader";
import Title from "../../components/Title";

import { AiOutlineSetting } from 'react-icons/ai';
import { FiUpload } from 'react-icons/fi';

import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";

import firebase from '../../services/firebaseConnection';

import avatar from '../../assets/img/avatar.png';
import { toast } from "react-toastify";

import './admin.css';
import { Button } from "react-bootstrap";

export default function UserConfig() {
    const { user, setUser } = useContext(AuthContext);

    const [name, setName] = useState(user && user.name);
    const [email, setEmail] = useState(user && user.email);

    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
    const [imageAvatar, setImageAvatar] = useState(null);

    const [loadingSave, setLoadingSave] = useState(false);


    function handleFile(e) {
        if (e.target.files[0]) {
            const image = e.target.files[0];

            if (image.type === 'image/jpeg' || image.type === 'image/png' || image.type === 'image/jpg') {
                setImageAvatar(image);
                setAvatarUrl(URL.createObjectURL(e.target.files[0]));
            }
            else {
                toast.warning('Envie uma imagem do tipo PNG, JPEG ou JPG');
                setImageAvatar(null);
                return null;
            }
        }
    }

    async function handleUpload() {
        const currentUid = user.uid;

        const uploadTask = await firebase.storage()
        .ref(`images/${currentUid}/${imageAvatar.name}`)
        .put(imageAvatar)
        .then(async () => {

            await firebase.storage().ref(`images/${currentUid}`)
            .child(imageAvatar.name).getDownloadURL()
            .then( async (url)=> {
                let urlFoto = url;

                await firebase.firestore().collection('users')
                .doc(user.uid)
                .update({
                    avatarUrl: urlFoto,
                    name: name
                })
                .then(() => {
                    let data = {
                        ...user,
                        avatarUrl: urlFoto,
                        name: name
                    };
                    setUser(data);
                })
            })
        })
    }

    async function handleSave(e) {
        e.preventDefault();
        setLoadingSave(true);
        
        if (imageAvatar === null && name !== '') {
            await firebase.firestore().collection('users')
            .doc(user.uid)
            .update({
                name: name
            })
            .then (() => {
                let data = {
                    ...user,
                    name: name
                };
                setUser(data);
            })
        } 
        else if (name !== '' && imageAvatar !== null) {
            handleUpload();
        }
        toast.success('As alterações foram salvas!');
        setLoadingSave(false);
    }

    return(
        <div className='admin'>
            <AdminHeader />

            <div className='content'>
                <Title name="Configurações de usuário">
                    <AiOutlineSetting size={25} />
                </Title>

                <div className='special-container'>
                    <form className="form-profile" onSubmit={handleSave}>
                        <label className='label-avatar'>
                            <span>
                                <FiUpload color='#fff' size={25} />
                            </span>

                            <input type="file" accept='image/*' onChange={handleFile} /><br/>
                            { avatarUrl == null ? 
                                <img src={avatar} width="250" height="250" alt="Foto de perfil do usuário" />
                                : 
                                <img src={avatarUrl} width="250" height="250" alt="Foto de perfil do usuário" />
                            }
                        </label>

                        <label>Nome</label>
                        <input type="text" value={name} onChange={ (e) => setName(e.target.value)} />
                        
                        <label>Email</label>
                        <input type="text" value={email} disabled={true} />
                            
                        <Button type='submit'>{loadingSave ? 'Salvando...' : 'Salvar'}</Button>
                    </form>
                </div>

            </div>
        </div>
    );
}