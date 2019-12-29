/*global chrome*/
import React, { useState, useLayoutEffect } from 'react';
import axios from 'axios';
import { useSettinngsStateWithLocalStorage } from '../services';
import translations  from '../translations';


// TODO: place to config
const API_URL = '//api.stoklab.ru/';

const AppContext = React.createContext({
    lang: '',
    currentLangData: {},
    switchLang: () => { },
    currentUrl: '',
    siteInfo: null,
});

export default AppContext;

export function AppProvider(props) {
    const [ currentUrl, setCurrentUrl ] = useState('');
    const [ extSettings ] = useSettinngsStateWithLocalStorage();
    const { language: currentLanguage } = extSettings;
    const [ lang, setLang ] = useState(currentLanguage);
    const [ currentLangData, setCurrentLangData ] = useState({});
    const [ connectionStatus, setConnectionStatus ] = useState(false);
    const [ siteInfo, setSiteInfo ] = useState(null);

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
            if (name === 'extension-tabs' && !!tab && !!tab.url && currentUrl !== tab.url) {
              setCurrentUrl(tab.url);
              fetchSiteInfo(tab.url);
            //   var url = new URL(tab.url);
            //   if (url.hostname !== currentDomain) {
            //     setCurrentDomain(url.hostname);
            //   }
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


    const fetchSiteInfo = (url) => {
        try  {
            // console.log('trying do a POST request to %O with data %O', `${API_URL}?info_by_url`, { url });
            axios.post(`${API_URL}?info_by_url`, { url })
            .then((response) => {
                console.log('response', response);
                setSiteInfo(response.data);
                setConnectionStatus(true);
            })
            .catch((error) => {
                console.error(error);
                setSiteInfo(null);
                setConnectionStatus(false);
            });
        } catch(er) {
            console.warn(er);
            setSiteInfo(null);
            setConnectionStatus(false);
        }
    }

    const refetchSiteInfo = () => {
        !!currentUrl && fetchSiteInfo(currentUrl);
    }

    return (
        <AppContext.Provider value={{
            lang,
            switchLang,
            currentLangData,
            connectionStatus,
            siteInfo,
            refetchSiteInfo,
        }}>
            {props.children}
        </AppContext.Provider>
    );
};