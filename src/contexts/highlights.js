import { useState, createContext, useEffect } from 'react';

import firebase from '../services/firebaseConnection';
import { format } from 'date-fns';

export const HighlightsContext = createContext({});

export default function HighlightsProvider({ children }) {

    const [highlights, setHighlights] = useState([]);
    const [loadingHighlights, setLoadingHighlights] = useState(false);

    useEffect(() => {

        async function loadHighlights() {
            setLoadingHighlights(true);
            await firebase.firestore().collection('highlights').orderBy('created', 'desc')
            .get()
            .then((snapshot) => {
                let highlightList = [];

                snapshot.forEach((doc) => {
                    highlightList.push({
                        id: doc.id,
                        created: doc.data().created,
                        createdFormated: format(doc.data().created.toDate(), 'dd/MM/yyyy HH:mm:ss'),
                        title: doc.data().title,
                        imgUrl: doc.data().imgUrl,
                        content: doc.data().content,
                        link: doc.data().link,
                        filesUrl: doc.data().filesUrl
                    })
                })
                setHighlights(highlightList);
                setLoadingHighlights(false);
            })
            .catch((error) => {
                console.log(error);
                setLoadingHighlights(false);
            })
        }

        loadHighlights();

    }, [])

    return (
        <HighlightsContext.Provider 
            value={{
                highlights,
                loadingHighlights
            }}
        >
            {children}
        </HighlightsContext.Provider>
    );
}