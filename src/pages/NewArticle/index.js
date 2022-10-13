import AdminHeader from "../../components/AdminHeader";
import Title from "../../components/Title";
import { FiPlusCircle } from 'react-icons/fi';
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import firebase from '../../services/firebaseConnection';
import { toast } from "react-toastify";
import './newarticle.css';


export default function NewArticle() {
    const { id } = useParams();

    const history = useHistory();

    const [title, setTitle] = useState('');
    const [abstract, setAbstract] = useState('');
    const [authors, setAuthors] = useState(null);
    const [article, setArticle] = useState(null);
    const [articleUrl, setArticleUrl] = useState(null);

    const [loadingRegister, setLoadingRegister] = useState(false);
    const [idArticle, setIdArticle] = useState(false);



    useEffect(() => {
        async function loadArticleById() {
            await firebase.firestore().collection('articles').doc(id)
                .get()
                .then((snapshot) => {
                    setTitle(snapshot.data().title);
                    setAbstract(snapshot.data().abstract);
                    setAuthors(snapshot.data().authors);
                    setIdArticle(true);
                })
                .catch((error) => {
                    console.log("Erro no parâmetro id: ", error);
                    setIdArticle(false);
                })
        }

        if (id) {
            loadArticleById();
        }
    }, [id])


    function handleArticle(e) {

        if (e.target.files[0]) {
            const article = e.target.files[0];
            if (article.type === 'application/pdf') {
                setArticle(article);
            } else {
                toast.warning('Envie um artigo do tipo PDF');
                setArticle(null);
                return null;
            }
        }

    }

    async function updateArticleUrl(docId, urlArticle) {
        await firebase.firestore().collection('articles')
            .doc(docId)
            .update({
                articleUrl: urlArticle
            })
            .then(() => {
                if (idArticle) {
                    toast.success('Artigo editado com sucesso!');
                } else {
                    toast.success('Artigo criado com sucesso!');
                }
                setLoadingRegister(false);
                history.push('/admin/articles');
            })
    }

    async function getDownloadUrl(docId) {
        await firebase.storage().ref(`articles/${docId}`)
            .child(article.name).getDownloadURL()
            .then( async (url) => {
                let urlArticle = url;

                await updateArticleUrl(docId, urlArticle);
        })
    }

    async function uploadArticle(docId) {
        const uploadArticle = await firebase.storage()
            .ref(`articles/${docId}/${article.name}`)
            .put(article)
            .then(async () => {

                await getDownloadUrl(docId);
        })
    }

    async function createArticle() {
        await firebase.firestore().collection('articles')
            .add({
                created: new Date(),
                title: title,
                authors: authors,
                abstract: abstract,
                articleUrl: articleUrl
            })
            .then(async (docRef) => {
                const docId = docRef.id;

                await uploadArticle(docId);
            })
            .catch((error) => {
                toast.error('Ops, ocorreu um erro inesperado ao criar artigo!');
                console.log(error);
                setLoadingRegister(false);
            })
    }

    async function updateArticle() {
        await firebase.firestore().collection('articles')
            .doc(id)
            .update({
                title: title,
                abstract: abstract,
                authors: authors
            })
            .then( async () => {
                if (article !== null) {                
                    await uploadArticle(id);
                } else {
                    toast.success('Artigo editado com sucesso!');
                    setLoadingRegister(false);
                    history.push('/admin/articles');
                }
            })
            .catch((err) => {
                toast.error('Ops, erro ao editar artigo!');
                console.log(err);
                setLoadingRegister(false);
            })
    }

    async function handleRegister(e) {
        e.preventDefault();

        setLoadingRegister(true);

        if (idArticle) {
            if (title !== '' && authors !== '' && abstract !== '') {
                await updateArticle();
                return;
            } else {
                toast.error('Erro ao editar artigo! Verifique se campos "Título", "Autores" e "Resumo" estão preenchidos.');
                setLoadingRegister(false);
                return;
            }
        }

        if (title !== '' && authors !== '' && abstract !== '' && article !== null) {
            await createArticle();
        } else {
            toast.error('Erro ao criar artigo! Verifique se campos "Título", "Autores", "Resumo" e "Artigo" estão preenchidos.');
            setLoadingRegister(false);
        }
    }



    return(
        <div className="new-article">
            <AdminHeader />

            <div className="content">
                <Title name="Novo Artigo">
                    <FiPlusCircle size={25} />
                </Title>

                <div className="special-container">
                    <form className="form-article" onSubmit={handleRegister}>

                        <label>Título</label>
                        <input type="text" placeholder="Título" value={title} onChange={ (e) => setTitle(e.target.value)} />

                        <label>Autores</label>
                        <input type="text" placeholder="Autores" value={authors} onChange={ (e) => setAuthors(e.target.value)} />
                        
                        <label>Resumo</label>
                        <textarea type="text" placeholder="Adicione um resumo para o artigo" value={abstract} onChange={ (e) => setAbstract(e.target.value)} />

                        <label>Artigo</label>
                        <input type="file" accept="application/pdf" onChange={handleArticle} />

                        <button type="submit">{loadingRegister ? 'Registrando...' : 'Registrar'}</button>
                    </form>

                </div>

            </div>
        </div>
    );
}