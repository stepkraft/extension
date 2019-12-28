/*global chrome*/
import React, { useState, useLayoutEffect } from 'react';
import { useSettinngsStateWithLocalStorage } from '../services';
import translations  from '../translations';

const AppContext = React.createContext({
    lang: '',
    currentLangData: {},
    switchLang: () => { },
    currentDomain: '',
});

export default AppContext;

export function AppProvider(props) {
    const [ currentDomain, setCurrentDomain ] = useState('');
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

    try {
        chrome.runtime.onConnect.addListener((port) => {
          port.onMessage.addListener(({name, payload: { tab }}) => {
            if (name === 'extension-tabs' && !!tab && !!tab.url) {
              var url = new URL(tab.url);
              if (url.hostname !== currentDomain) {
                setCurrentDomain(url.hostname);
              }
            }
          });
        });
      } catch(er) { console.warn(er); }

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
            currentDomain,
        }}>
            {props.children}
        </AppContext.Provider>
    );
};