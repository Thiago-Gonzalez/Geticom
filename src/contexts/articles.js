import { useState, createContext, useEffect } from 'react';

import appConfig from '../config.json';

export const ArticlesContext = createContext({});

export default function ArticlesProvider({ children }) {

    const [articles, setArticles] = useState([]);

    useEffect(() => {

        setArticles(appConfig.articles.reverse());

    }, [])

    return (
        <ArticlesContext.Provider 
            value={{
                articles,
            }}
        >
            {children}
        </ArticlesContext.Provider>
    );
}