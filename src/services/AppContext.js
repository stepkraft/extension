/*global chrome*/
import React, { useState, useLayoutEffect } from 'react';
import axios from 'axios';
import { useSettinngsStateWithLocalStorage } from '../services';
import translations  from '../translations';


// TODO: place to config
const API_URL = '//api.stoklab.ru/';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';


const AppContext = React.createContext({
    lang: '',
    currentLangData: {},
    switchLang: () => { },
    currentUrl: '',
    sitesInfo: [],
});

export default AppContext;

export function AppProvider(props) {
    const [ currentUrl, setCurrentUrl ] = useState('');
    const [ extSettings ] = useSettinngsStateWithLocalStorage();
    const { language: currentLanguage } = extSettings;
    const [ lang, setLang ] = useState(currentLanguage);
    const [ currentLangData, setCurrentLangData ] = useState({});
    const [ connectionStatus, setConnectionStatus ] = useState(false);
    const [ sitesInfo, setSitesInfo ] = useState([]);

    const fetchTranslation = async (lg) => {
        try {
            setCurrentLangData(translations[lg]);
        } catch (e) {
            console.error('cannot fetch translations', e)
        }
    }

    try {
        chrome.runtime.onConnect.addListener((port) => {            
          if (port.name === 'ext-communication') {
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
          }
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
            axios.get(
                API_URL,
                {
                    params: { info_by_url: '', url },
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type':'application/json'
                    }
                }
            )
            .then((response) => {
                setSitesInfo(response.data);
                setConnectionStatus(true);
            })
            .catch((error) => {
                // console.error(error);
                setSitesInfo([]);
                setConnectionStatus(false);
            });
        } catch(er) {
            console.warn(er);
            setSitesInfo([]);
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
            sitesInfo,
            refetchSiteInfo,
        }}>
            {props.children}
        </AppContext.Provider>
    );
};