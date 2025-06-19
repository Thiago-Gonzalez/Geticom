import AdminHeader from "../../components/AdminHeader";
import { useState, useEffect } from "react";
import "./newtalent.css";
import Title from "../../components/Title";
import { FiPlusCircle } from "react-icons/fi";
import firebase from '../../services/firebaseConnection';
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router-dom";

export default function NewTalent() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        course: "",
        semester: "",
        skills: "",
        experience: "",
        linkedin: "",
        github: "",
        portfolio: "",
        availability: "full-time",
        notes: "",
        image: null
    });
    const [imageUrl, setImageUrl] = useState(null);
    const history = useHistory();
    const [loadingRegister, setLoadingRegister] = useState(false);

    useEffect(() => {
        if (id) {
            async function loadTalent() {
                const doc = await firebase.firestore().collection('talents').doc(id).get();
                if (doc.exists) {
                    const data = doc.data();
                    setFormData({
                        ...data,
                        image: null // não carregamos arquivo, só url
                    });
                    setImageUrl(data.imageUrl || null);
                }
            }
            loadTalent();
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

    async function uploadImg(talentId, file) {
        await firebase.storage()
            .ref(`talents/${talentId}/image/${file.name}`)
            .put(file)
            .then(async () => {
                await getImgDownloadUrl(talentId, file);
            });
    }

    async function getImgDownloadUrl(talentId, file) {
        await firebase.storage().ref(`talents/${talentId}/image`)
            .child(file.name).getDownloadURL()
            .then(async (url) => {
                await updateImgUrlInFirestore(talentId, url);
            });
    }

    async function updateImgUrlInFirestore(talentId, urlImg) {
        await firebase.firestore().collection('talents')
            .doc(talentId)
            .update({
                imageUrl: urlImg
            })
            .then(() => {
                toast.success('Talento cadastrado com sucesso!');
                setLoadingRegister(false);
                history.push('/admin/talentos');
            });
    }

    async function createTalent() {
        const { image, ...fields } = formData;
        await firebase.firestore().collection('talents')
            .add({
                ...fields,
                created: new Date(),
                imageUrl: null
            })
            .then(async (docRef) => {
                const docId = docRef.id;
                if (image) {
                    await uploadImg(docId, image);
                } else {
                    toast.success('Talento cadastrado com sucesso!');
                    setLoadingRegister(false);
                    history.push('/admin/talentos');
                }
            })
            .catch((error) => {
                toast.error('Erro ao cadastrar talento!');
                setLoadingRegister(false);
                console.log(error);
            });
    }

    async function updateTalent() {
        try {
            const { image, ...fields } = formData;
            let updatedFields = { ...fields };
            // Se o usuário selecionou uma nova imagem
            if (image) {
                // Exclui imagem antiga se existir
                if (imageUrl) {
                    const storageRef = firebase.storage().refFromURL(imageUrl);
                    await storageRef.delete();
                }
                // Faz upload da nova imagem
                const storageRef = firebase.storage().ref(`talents/${id}/image/${image.name}`);
                await storageRef.put(image);
                const url = await storageRef.getDownloadURL();
                updatedFields.imageUrl = url;
            }
            await firebase.firestore().collection('talents').doc(id).update(updatedFields);
            toast.success('Talento atualizado com sucesso!');
            setLoadingRegister(false);
            history.push('/admin/talentos');
        } catch (error) {
            toast.error('Erro ao atualizar talento!');
            setLoadingRegister(false);
            console.log(error);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoadingRegister(true);
        if (!formData.name || !formData.email || !formData.phone || !formData.course || !formData.semester || !formData.skills) {
            toast.error('Preencha todos os campos obrigatórios!');
            setLoadingRegister(false);
            return;
        }
        if (id) {
            await updateTalent();
        } else {
            await createTalent();
        }
    }

    return (
        <div className="new-talent">
            <AdminHeader />
            <div className="content">
                <Title name={id ? "Editar Talento" : "Novo Talento"}>
                    <FiPlusCircle size={25} />
                </Title>
                <div className="special-container">
                    <form className="form-talent" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="image">Foto do Aluno</label>
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

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="course">Curso *</label>
                                <input
                                    type="text"
                                    id="course"
                                    name="course"
                                    value={formData.course}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="semester">Semestre *</label>
                                <input
                                    type="number"
                                    id="semester"
                                    name="semester"
                                    min="1"
                                    max="10"
                                    value={formData.semester}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="skills">Habilidades Técnicas *</label>
                            <textarea
                                id="skills"
                                name="skills"
                                value={formData.skills}
                                onChange={handleChange}
                                placeholder="Ex: JavaScript, React, Node.js, etc."
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="experience">Experiência Profissional</label>
                            <textarea
                                id="experience"
                                name="experience"
                                value={formData.experience}
                                onChange={handleChange}
                                placeholder="Descreva suas experiências profissionais relevantes"
                            />
                        </div>

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
                            <label htmlFor="github">GitHub</label>
                            <input
                                type="url"
                                id="github"
                                name="github"
                                value={formData.github}
                                onChange={handleChange}
                                placeholder="https://github.com/seu-usuario"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="portfolio">Portfólio</label>
                            <input
                                type="url"
                                id="portfolio"
                                name="portfolio"
                                value={formData.portfolio}
                                onChange={handleChange}
                                placeholder="Link para seu portfólio"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="availability">Disponibilidade *</label>
                            <select
                                id="availability"
                                name="availability"
                                value={formData.availability}
                                onChange={handleChange}
                                required
                            >
                                <option value="full-time">Tempo Integral</option>
                                <option value="part-time">Meio Período</option>
                                <option value="freelance">Freelance</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="notes">Observações Adicionais</label>
                            <textarea
                                id="notes"
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                placeholder="Informações adicionais relevantes"
                            />
                        </div>

                        <button type="submit">{loadingRegister ? (id ? 'Salvando...' : 'Registrando...') : (id ? 'Salvar' : 'Registrar')}</button>
                    </form>
                </div>
            </div>
        </div>
    );
}