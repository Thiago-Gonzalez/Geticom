import AdminHeader from "../../components/AdminHeader";

import { FiPlusCircle } from 'react-icons/fi';

import './newhighlight.css';
import Title from "../../components/Title";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import firebase from '../../services/firebaseConnection';
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

export default function NewHighlight() {
    const { id } = useParams();

    const history = useHistory();

    const [title, setTitle] = useState('');
    const [imgUrl, setImgUrl] = useState(null);
    const [img, setImg] = useState(null);
    const [content, setContent] = useState('');
    const [link, setLink] = useState(null);
    const [files, setFiles] = useState([]);
    const [filesUrl, setFilesUrl] = useState([]);

    const [loadingRegister, setLoadingRegister] = useState(false);
    const [idHighlight, setIdHighlight] = useState(false);

    useEffect(() => {
        async function loadHighlightById() {
            await firebase.firestore().collection('highlights').doc(id)
                .get()
                .then((snapshot) => {
                    setTitle(snapshot.data().title);
                    setContent(snapshot.data().content);
                    setLink(snapshot.data().link);
                    setIdHighlight(true);
                })
                .catch((error) => {
                    console.log("Erro no parâmetro id: ", error);
                    setIdHighlight(false);
                })
        }

        if (id) {
            loadHighlightById();
        }
    }, [id])

    function handleImg(e) {
        if (e.target.files[0]) {
            const image = e.target.files[0];

            if (image.type === 'image/jpeg' || image.type === 'image/png') {
                setImg(image);
            } else {
                toast.warning('Envie uma imagem do tipo PNG, JPEG ou JPG');
                setImg(null);
                return null;
            }
        }
    }

    function handlePdfs(e) {

        if (e.target.files.length > 0) {
            const fileList = document.getElementById('fileList').files;
            setFiles(fileList);
        }

    }

    async function handleRegister(e) {
        e.preventDefault();

        setLoadingRegister(true);

        if (idHighlight) {
           if (title !== '' && content !== '') {
                await firebase.firestore().collection('highlights')
                .doc(id)
                .update({
                    title: title,
                    content: content,
                    link: link
                })
                .then( async () => {
                    if (img !== null) {
                        
                        const uploadImg = await firebase.storage()
                        .ref(`highlights/${id}/image/${img.name}`)
                        .put(img)
                        .then(async () => {
                            await firebase.storage().ref(`highlights/${id}/image`)
                            .child(img.name).getDownloadURL()
                            .then( async (url) => {
                                let urlImg = url;

                                await firebase.firestore().collection('highlights')
                                .doc(id)
                                .update({
                                    imgUrl: urlImg
                                })
                                .then(() => {

                                    if (files.length > 0) {
                                        [...files].forEach( async (file) => {

                                            const uploadFiles = await firebase.storage()
                                            .ref(`highlights/${id}/files/${file.name}`)
                                            .put(file)
                                            .then(async () => {

                                                await firebase.storage().ref(`highlights/${id}/files`)
                                                .child(file.name).getDownloadURL()
                                                .then( async (url) => {
                                                    let urlFile = url;

                                                    await firebase.firestore().collection('highlights')
                                                    .doc(id)
                                                    .update({
                                                        filesUrl: firebase.firestore.FieldValue.arrayUnion(urlFile)
                                                    })
                                                    .then(() => {
                                                        toast.success('Destaque editado com sucesso!');
                                                        setLoadingRegister(false);
                                                        history.push('/admin/highlights');
                                                    })
                                                })
                                            })
                                        })
                                    } else {
                                        toast.success('Destaque editado com sucesso!');
                                        setLoadingRegister(false);
                                        history.push('/admin/highlights');
                                    }

                                })
                            })
                        })
                    } else if (img === null && files.length > 0) {
                        [...files].forEach( async (file) => {

                            const uploadFiles = await firebase.storage()
                            .ref(`highlights/${id}/files/${file.name}`)
                            .put(file)
                            .then(async () => {

                                await firebase.storage().ref(`highlights/${id}/files`)
                                .child(file.name).getDownloadURL()
                                .then( async (url) => {
                                    let urlFile = url;

                                    await firebase.firestore().collection('highlights')
                                    .doc(id)
                                    .update({
                                        filesUrl: firebase.firestore.FieldValue.arrayUnion(urlFile)
                                    })
                                    .then(() => {
                                        toast.success('Destaque editado com sucesso!');
                                        setLoadingRegister(false);
                                        history.push('/admin/highlights');
                                    })
                                })
                            })
                        })
                    } else {
                        toast.success('Destaque editado com sucesso!');
                        setLoadingRegister(false);
                        history.push('/admin/highlights');
                    }
                })
                .catch((err) => {
                    toast.error('Ops, erro ao editar destaque!');
                    console.log(err);
                    setLoadingRegister(false);
                })
                return;
           } else {
                toast.error('Necessário preencher os campos "Título" e "Conteúdo"!');
                setLoadingRegister(false);
           }
        }

        if (title !== '' && content !== '' && img !== null) {
            await firebase.firestore().collection('highlights')
            .add({
                created: new Date(),
                title: title,
                imgUrl: imgUrl,
                content: content,
                link: link,
                filesUrl: filesUrl
            })
            .then(async (docRef) => {
                const docId = docRef.id;

                const uploadImg = await firebase.storage()
                .ref(`highlights/${docId}/image/${img.name}`)
                .put(img)
                .then(async () => {

                    await firebase.storage().ref(`highlights/${docId}/image`)
                    .child(img.name).getDownloadURL()
                    .then( async (url) => {
                        let urlImg = url;

                        await firebase.firestore().collection('highlights')
                        .doc(docId)
                        .update({
                            imgUrl: urlImg
                        })
                        .then(() => {

                            if (files.length > 0) {
                                [...files].forEach( async (file) => {

                                    const uploadFiles = await firebase.storage().ref(`highlights/${docId}/files/${file.name}`)
                                    .put(file)
                                    .then(async () => {

                                        await firebase.storage().ref(`highlights/${docId}/files`)
                                        .child(file.name).getDownloadURL()
                                        .then( async (url) => {
                                            let urlFile = url;

                                            await firebase.firestore().collection('highlights')
                                            .doc(docId)
                                            .update({
                                                filesUrl: firebase.firestore.FieldValue.arrayUnion(urlFile)
                                            })
                                            .then(() => {
                                                toast.success('Destaque criado com sucesso!');
                                                setLoadingRegister(false);
                                                history.push('/admin/highlights');
                                            })
                                        })
                                    })
                                })
                            } else {
                                toast.success('Destaque criado com sucesso!');
                                setLoadingRegister(false);
                                history.push('/admin/highlights');
                            }

                        })
                    })
                })
            })
            .catch((error) => {
                toast.error('Ops, ocorreu um erro inesperado ao criar destaque!');
                console.log(error);
                setLoadingRegister(false);
            })
        } else {
            toast.error('Necessário preencher os campos "Título", "Imagem de destaque" e "Conteúdo"!');
            setLoadingRegister(false);
        }
    }


    return(
        <div className="new-highlight">
            <AdminHeader />

            <div className="content">
                <Title name="Novo Destaque">
                    <FiPlusCircle size={25} />
                </Title>

                <div className="special-container">
                    <form className="form-highlight" onSubmit={handleRegister}>

                        <label>Título</label>
                        <input type="text" placeholder="Título" value={title} onChange={ (e) => setTitle(e.target.value)} />

                        <label>Imagem de destaque</label>
                        <input type="file" accept='image/*' onChange={handleImg} />
                        
                        <label>Conteúdo</label>
                        <textarea type="text" placeholder="Adicione um conteúdo para o destaque" value={content} onChange={ (e) => setContent(e.target.value)} />
                    
                        <label>Link</label>
                        <input type="text" placeholder="Link" value={link} onChange={ (e) => setLink(e.target.value)} />

                        <label>Arquivos</label>
                        <input id="fileList" type="file" accept="application/pdf" multiple="multiple" onChange={handlePdfs} />

                        <button type="submit">{loadingRegister ? 'Registrando...' : 'Registrar'}</button>
                    </form>

                </div>

            </div>
        </div>
    );
}