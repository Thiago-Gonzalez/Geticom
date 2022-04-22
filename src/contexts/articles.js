import { useState, createContext, useEffect } from 'react';

import firebase from '../services/firebaseConnection';
import { format } from 'date-fns';

export const ArticlesContext = createContext({});

export default function ArticlesProvider({ children }) {

    const [articles, setArticles] = useState([]);
    const [loadingArticles, setLoadingArticles] = useState(false);

    useEffect(() => {

        async function loadArticles() {
            setLoadingArticles(true);
            await firebase.firestore().collection('articles').orderBy('created', 'desc')
            .get()
            .then((snapshot) => {
                let articleList = [];

                snapshot.forEach((doc) => {
                    articleList.push({
                        id: doc.id,
                        created: doc.data().created,
                        createdFormated: format(doc.data().created.toDate(), 'dd/MM/yyyy HH:mm:ss'),
                        title: doc.data().title,
                        authors: doc.data().authors,
                        abstract: doc.data().abstract,
                        articleUrl: doc.data().articleUrl
                    })
                })
                setArticles(articleList);
                setLoadingArticles(false);
            })
            .catch((error) => {
                console.log(error);
                setLoadingArticles(false);
            })
        }

        loadArticles();

    }, [])

    return (
        <ArticlesContext.Provider 
            value={{
                articles,
                loadingArticles
            }}
        >
            {children}
        </ArticlesContext.Provider>
    );
}