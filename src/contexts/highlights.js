import { useState, createContext, useEffect } from 'react';

import appConfig from '../config.json';

export const HighlightsContext = createContext({});

export default function HighlightsProvider({ children }) {

    const [highlights, setHighlights] = useState([]);

    useEffect(() => {

        setHighlights(appConfig.highlights.reverse());

    }, [])

    return (
        <HighlightsContext.Provider 
            value={{
                highlights,
            }}
        >
            {children}
        </HighlightsContext.Provider>
    );
}