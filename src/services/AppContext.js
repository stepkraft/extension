import React, { useState, useLayoutEffect } from 'react';
import { useSettinngsStateWithLocalStorage } from '../services';
import translations  from '../translations';

const AppContext = React.createContext({
    lang: '',
    currentLangData: {},
    switchLang: () => { },
});

export default AppContext;

export function AppProvider(props) {
    const [ extSettings ] = useSettinngsStateWithLocalStorage();
    const { language: currentLanguage } = extSettings;
    const [ lang, setLang ] = useState(currentLanguage);
    const [ currentLangData, setCurrentLangData ] = useState({});
    const [ connectionStatus, setConnectionStatus ] = useState(false);

    const fetchTranslation = async (lg) => {
        try {
            setCurrentLangData(translations[lg]);
        } catch (e) {
            console.error('cannot fetch translations', e)
        }
    }

    useLayoutEffect(() => {
        if (currentLanguage) {
            setLang(currentLanguage);
            fetchTranslation(currentLanguage);
        } 
    }, [currentLanguage]);

    const switchLang = (language) => {
        setLang(language);
        fetchTranslation(language);
    };

    return (
        <AppContext.Provider value={{
            lang,
            switchLang,
            currentLangData,
            connectionStatus,
            setConnectionStatus,
        }}>
            {props.children}
        </AppContext.Provider>
    );
};