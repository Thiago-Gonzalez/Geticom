import AdminHeader from "../../components/AdminHeader";
import { useState, useEffect } from "react";
import "./newfaculty.css";
import Title from "../../components/Title";
import { FiPlusCircle } from "react-icons/fi";
import firebase from '../../services/firebaseConnection';
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router-dom";

export default function NewFaculty() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: "",
        academicTitle: "",
        researchArea: "",
        email: "",
        phone: "",
        biography: "",
        disciplines: "",
        academicFormation: "",
        linkedin: "",
        lattes: "",
        image: null
    });
    const [publishedWorks, setPublishedWorks] = useState([{ title: "", link: "" }]);
    const [imageUrl, setImageUrl] = useState(null);
    const history = useHistory();
    const [loadingRegister, setLoadingRegister] = useState(false);

    useEffect(() => {
        if (id) {
            async function loadFaculty() {
                const doc = await firebase.firestore().collection('faculty').doc(id).get();
                if (doc.exists) {
                    const data = doc.data();
                    setFormData({
                        ...data,
                        image: null
                    });
                    setImageUrl(data.imageUrl || null);
                    if (data.publishedWorks && data.publishedWorks.length > 0) {
                        setPublishedWorks(data.publishedWorks);
                    }
                }
            }
            loadFaculty();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prevState => ({
                ...prevState,
                image: file
            }));
            const reader = new FileReader();
            reader.readAsDataURL(file);
        } else {
            setFormData(prevState => ({
                ...prevState,
                image: null
            }));
        }
    };

    const handlePublishedWorkChange = (index, field, value) => {
        const newPublishedWorks = [...publishedWorks];
        newPublishedWorks[index][field] = value;
        setPublishedWorks(newPublishedWorks);
    };

    const addPublishedWork = () => {
        setPublishedWorks([...publishedWorks, { title: "", link: "" }]);
    };

    const removePublishedWork = (index) => {
        if (publishedWorks.length > 1) {
            const newPublishedWorks = publishedWorks.filter((_, i) => i !== index);
            setPublishedWorks(newPublishedWorks);
        }
    };

    async function uploadImg(facultyId, file) {
        await firebase.storage()
            .ref(`faculty/${facultyId}/image/${file.name}`)
            .put(file)
            .then(async () => {
                await getImgDownloadUrl(facultyId, file);
            });
    }

    async function getImgDownloadUrl(facultyId, file) {
        await firebase.storage().ref(`faculty/${facultyId}/image`)
            .child(file.name).getDownloadURL()
            .then(async (url) => {
                await updateImgUrlInFirestore(facultyId, url);
            });
    }

    async function updateImgUrlInFirestore(facultyId, urlImg) {
        await firebase.firestore().collection('faculty')
            .doc(facultyId)
            .update({
                imageUrl: urlImg
            })
            .then(() => {
                toast.success('Docente cadastrado com sucesso!');
                setLoadingRegister(false);
                history.push('/admin/docentes');
            });
    }

    async function createFaculty() {
        const { image, ...fields } = formData;
        const facultyData = {
            ...fields,
            publishedWorks: publishedWorks.filter(work => work.title.trim() !== ""),
            created: new Date(),
            imageUrl: null
        };

        await firebase.firestore().collection('faculty')
            .add(facultyData)
            .then(async (docRef) => {
                const docId = docRef.id;
                if (image) {
                    await uploadImg(docId, image);
                } else {
                    toast.success('Docente cadastrado com sucesso!');
                    setLoadingRegister(false);
                    history.push('/admin/docentes');
                }
            })
            .catch((error) => {
                toast.error('Erro ao cadastrar docente!');
                setLoadingRegister(false);
                console.log(error);
            });
    }

    async function updateFaculty() {
        try {
            const { image, ...fields } = formData;
            let updatedFields = { 
                ...fields,
                publishedWorks: publishedWorks.filter(work => work.title.trim() !== "")
            };
            
            if (image) {
                if (imageUrl) {
                    const storageRef = firebase.storage().refFromURL(imageUrl);
                    await storageRef.delete();
                }

                const storageRef = firebase.storage().ref(`faculty/${id}/image/${image.name}`);
                await storageRef.put(image);
                const url = await storageRef.getDownloadURL();
                updatedFields.imageUrl = url;
            }
            
            await firebase.firestore().collection('faculty').doc(id).update(updatedFields);
            toast.success('Docente atualizado com sucesso!');
            setLoadingRegister(false);
            history.push('/admin/docentes');
        } catch (error) {
            toast.error('Erro ao atualizar docente!');
            setLoadingRegister(false);
            console.log(error);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoadingRegister(true);
        
        if (!formData.name || !formData.academicTitle || !formData.researchArea || !formData.email || !formData.phone || !formData.disciplines) {
            toast.error('Preencha todos os campos obrigatórios!');
            setLoadingRegister(false);
            return;
        }
        
        if (id) {
            await updateFaculty();
        } else {
            await createFaculty();
        }
    }

    return (
        <div className="new-faculty">
            <AdminHeader />
            <div className="content">
                <Title name={id ? "Editar Docente" : "Novo Docente"}>
                    <FiPlusCircle size={25} />
                </Title>
                <div className="special-container">
                    <form className="form-faculty" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="image">Foto do Docente</label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            {imageUrl && !formData.image && (
                                <img src={imageUrl} alt="Foto atual" style={{ width: 100, marginTop: 10, borderRadius: 8 }} />
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="name">Nome Completo *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="academicTitle">Título Acadêmico *</label>
                            <input
                                type="text"
                                id="academicTitle"
                                name="academicTitle"
                                value={formData.academicTitle}
                                onChange={handleChange}
                                placeholder="Ex: Doutor em Ciência da Computação"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="researchArea">Área de Pesquisa *</label>
                            <input
                                type="text"
                                id="researchArea"
                                name="researchArea"
                                value={formData.researchArea}
                                onChange={handleChange}
                                placeholder="Ex: Inteligência Artificial, Machine Learning"
                                required
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="email">E-mail *</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Telefone *</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="disciplines">Disciplinas Ministradas *</label>
                            <textarea
                                id="disciplines"
                                name="disciplines"
                                value={formData.disciplines}
                                onChange={handleChange}
                                placeholder="Ex: Algoritmos e Estruturas de Dados, Inteligência Artificial, Programação Orientada a Objetos"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="biography">Biografia</label>
                            <textarea
                                id="biography"
                                name="biography"
                                value={formData.biography}
                                onChange={handleChange}
                                placeholder="Descreva a biografia do docente"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="academicFormation">Formação Acadêmica</label>
                            <textarea
                                id="academicFormation"
                                name="academicFormation"
                                value={formData.academicFormation}
                                onChange={handleChange}
                                placeholder="Ex: Doutorado em Ciência da Computação - USP (2015)&#10;Mestrado em Ciência da Computação - UFF (2010)&#10;Graduação em Engenharia da Computação - UEMA (2008)"
                            />
                        </div>

                        <div className="form-group">
                            <label>Trabalhos Publicados</label>
                            {publishedWorks.map((work, index) => (
                                <div key={index} className="published-work-item">
                                    <div className="work-inputs">
                                        <input
                                            type="text"
                                            placeholder="Título do trabalho"
                                            value={work.title}
                                            onChange={(e) => handlePublishedWorkChange(index, 'title', e.target.value)}
                                        />
                                        <input
                                            type="url"
                                            placeholder="Link do trabalho"
                                            value={work.link}
                                            onChange={(e) => handlePublishedWorkChange(index, 'link', e.target.value)}
                                        />
                                    </div>
                                    {publishedWorks.length > 1 && (
                                        <button
                                            type="button"
                                            className="remove-work-btn"
                                            onClick={() => removePublishedWork(index)}
                                        >
                                            Remover
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                className="add-work-btn"
                                onClick={addPublishedWork}
                            >
                                Adicionar Trabalho
                            </button>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="linkedin">LinkedIn</label>
                                <input
                                    type="url"
                                    id="linkedin"
                                    name="linkedin"
                                    value={formData.linkedin}
                                    onChange={handleChange}
                                    placeholder="https://linkedin.com/in/seu-perfil"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="lattes">Currículo Lattes</label>
                                <input
                                    type="url"
                                    id="lattes"
                                    name="lattes"
                                    value={formData.lattes}
                                    onChange={handleChange}
                                    placeholder="http://lattes.cnpq.br/seu-id"
                                />
                            </div>
                        </div>

                        <button type="submit">{loadingRegister ? (id ? 'Salvando...' : 'Registrando...') : (id ? 'Salvar' : 'Registrar')}</button>
                    </form>
                </div>
            </div>
        </div>
    );
}