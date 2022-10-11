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

    function successfulMesage() {
        if (idHighlight) {
            toast.success('Destaque editado com sucesso!');
        } else {
            toast.success('Destaque criado com sucesso!');
        }
    }

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

    async function updateHighlight(highlightId) {
        await firebase.firestore().collection('highlights')
        .doc(highlightId)
        .update({
            title: title,
            content: content,
            link: link
        })
        .then( async () => {
            if (img !== null) {
                
                await uploadImg(highlightId);

            } else if (img === null && files.length > 0) {
               await uploadFiles(highlightId);
            } else {
                successfulMesage();
                setLoadingRegister(false);
                history.push('/admin/highlights');
            }
        })
        .catch((err) => {
            toast.error('Ops, erro ao editar destaque!');
            console.log(err);
            setLoadingRegister(false);
        })
    }

    async function uploadImg(highlightId) {
        const uploadImg = await firebase.storage()
        .ref(`highlights/${highlightId}/image/${img.name}`)
        .put(img)
        .then(async () => {
            await getImgDownloadUrl(highlightId);
        })
    }

    async function getImgDownloadUrl(highlightId) {
        await firebase.storage().ref(`highlights/${highlightId}/image`)
            .child(img.name).getDownloadURL()
            .then( async (url) => {
                let urlImg = url;

                await updateImgUrlInFirestore(highlightId, urlImg);
            })
    }

    async function updateImgUrlInFirestore(highlightId, urlImg) {
        await firebase.firestore().collection('highlights')
            .doc(highlightId)
            .update({
                imgUrl: urlImg
            })
            .then(async () => {
                await uploadFiles(highlightId);
            })
    }

    async function uploadFiles(highlightId) {
        if (files.length > 0) {
            [...files].forEach( async (file) => {

                const uploadFiles = await firebase.storage()
                .ref(`highlights/${highlightId}/files/${file.name}`)
                .put(file)
                .then(async () => {

                    await getFileDownloadUrl(highlightId, file);
                })
            })
        } else {
            successfulMesage();
            setLoadingRegister(false);
            history.push('/admin/highlights');
        }
    }

    async function getFileDownloadUrl(highlightId, file) {
        await firebase.storage().ref(`highlights/${highlightId}/files`)
            .child(file.name).getDownloadURL()
            .then( async (url) => {
                let urlFile = url;

                await updateFileUrlInFirestore(highlightId, urlFile);
            })
    }

    async function updateFileUrlInFirestore(highlightId, urlFile) {
        await firebase.firestore().collection('highlights')
            .doc(highlightId)
            .update({
                filesUrl: firebase.firestore.FieldValue.arrayUnion(urlFile)
            })
            .then(() => {
                successfulMesage();
                setLoadingRegister(false);
                history.push('/admin/highlights');
            })
    }

    async function createHighlight() {
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

            await uploadImg(docId);
        })
        .catch((error) => {
            toast.error('Ops, ocorreu um erro inesperado ao criar destaque!');
            console.log(error);
            setLoadingRegister(false);
        })
    }

    async function handleRegister(e) {
        e.preventDefault();

        setLoadingRegister(true);

        if (idHighlight) {
           if (title !== '' && content !== '') {
                await updateHighlight(id);
                return;
           } else {
                toast.error('Necessário preencher os campos "Título" e "Conteúdo"!');
                setLoadingRegister(false);
                return;
           }
        }

        if (title !== '' && content !== '' && img !== null) {
           await createHighlight();
           return;
        } else {
            toast.error('Necessário preencher os campos "Título", "Imagem de destaque" e "Conteúdo"!');
            setLoadingRegister(false);
            return;
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