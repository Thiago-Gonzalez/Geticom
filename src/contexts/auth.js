import { createContext, useEffect, useState } from "react";
import firebase from '../services/firebaseConnection';
import { toast } from 'react-toastify';


export const AuthContext = createContext({});

export default function AuthProvider({
    children
}) {

    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingSignOut, setLoadingSignOut] = useState(false);

    useEffect(() => {

        async function checkUser() {
            await firebase.auth().onAuthStateChanged(async (loggedUser) => {
                if (loggedUser) {
                    const userProfile = await firebase.firestore().collection('users')
                        .doc(loggedUser.uid).get();
                    let data = {
                        uid: loggedUser.uid,
                        name: userProfile.data().name,
                        avatarUrl: userProfile.data().avatarUrl,
                        email: loggedUser.email
                    }
                    setUser(data);
                    setLoading(false);
                } else {
                    setUser(null);
                    setLoading(false);
                }
            });
        }

        checkUser();

    }, [])


    async function signIn(email, password) {
        setLoadingAuth(true);

        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then(async (userCredential) => {

                if (userCredential.user.emailVerified) {

                    let uid = userCredential.user.uid;

                    const userProfile = await firebase.firestore().collection('users')
                        .doc(uid).get();


                    let data = {
                        uid: uid,
                        name: userProfile.data().name,
                        avatarUrl: userProfile.data().avatarUrl,
                        email: userCredential.user.email
                    }

                    setUser(data);
                    setLoadingAuth(false);
                    toast.success('Login realizado com sucesso!');
                } else {
                    signOut();
                    await firebase.auth().currentUser.sendEmailVerification()
                        .then(() => {
                            toast.error("E-mail não verificado! Um e-mail de verificação foi enviado para " + userCredential.user.email + ". Tente fazer login novamente após realizar a verificação de e-mail.");
                        })
                }

            })
            .catch((error) => {
                if (error.code === 'auth/unverified-email') {
                    toast.error("Email não verificado! Realize a verificação através do link que foi enviado ao seu email.");
                } else if (error.code === 'auth/wrong-password') {
                    toast.error("Falha ao realizar login! Verifique se suas credenciais estão corretas.");
                } else if (error.code === 'auth/invalid-email') {
                    toast.error("Email inválido!");
                } else if (error.code === 'auth/user-not-found') {
                    toast.error("Falha ao realizar login! Verifique se suas credenciais estão corretas.");
                } else {
                    console.log(error);
                    toast.error("Ops, ocorreu um erro inesperado ao realizar login!");
                }
                setLoadingAuth(false);
            })

    }

    async function signUp(email, password, name) {
        setLoadingAuth(true);

        await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async (userCredential) => {
                let uid = userCredential.user.uid;

                await firebase.firestore().collection('users')
                    .doc(uid).set({
                        name: name,
                        avatarUrl: null,
                    })
                    .then(() => {
                        signOut();
                        firebase.auth().currentUser.sendEmailVerification()
                            .then(() => {
                                setLoadingAuth(false);
                                toast.success('Cadastro realizado com sucesso! Um e-mail de verificação foi enviado para ' + userCredential.user.email);
                            })
                    })

            })
            .catch((error) => {
                if (error.code === 'auth/weak-password') {
                    toast.warning('Senha muito fraca! Crie uma senha com no mínimo 6 dígitos.');
                } else if (error.code === 'auth/email-already-in-use') {
                    toast.warning('Esse email já está em uso. Por favor, tente outro.');
                } else if (error.code === 'auth/invalid-email') {
                    toast.warning('Email inválido!');
                } else {
                    console.log(error);
                    toast.error("Ops,ocorreu um erro inesperado ao cadastrar!");
                }
                setLoadingAuth(false);
            })
    }

    function signOut() {
        setLoadingSignOut(true);
        setTimeout(async () => {
            await firebase.auth().signOut();
            setUser(null);
            setLoadingSignOut(false);
            setLoadingAuth(false);
        }, 1000);
    }

    return ( 
        <AuthContext.Provider 
            value = {
                {
                    signed: !!user,
                    user,
                    loading,
                    signOut,
                    signIn,
                    signUp,
                    loadingAuth,
                    setUser,
                    loadingSignOut
                }
            } >
                {
                    children
                } 
        </AuthContext.Provider>
    );
}