import React, { useState, useLayoutEffect } from 'react';
import { useSettinngsStateWithLocalStorage } from '../services';

const LangContext = React.createContext({
    lang: '',
    currentLangData: {},
    switchLang: () => { },
});

export default LangContext;

export function LangProvider(props) {
    const [extSettings] = useSettinngsStateWithLocalStorage();
    const { language: currentLanguage } = extSettings;
    const [lang, setLang] = useState(currentLanguage);
    const [currentLangData, setCurrentLangData] = useState({});

    const fetchTranslation = async (lg) => {
        try {
            const response = await fetch(`/translations/${lg}.json`);
            const langData = await response.json();
            setCurrentLangData(langData);
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
        <LangContext.Provider value={{
            lang,
            switchLang,
            currentLangData,
        }}>
            {props.children}
        </LangContext.Provider>
    );
};