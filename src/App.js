import React, { useState, useContext } from 'react';
import { Image } from 'semantic-ui-react';
import './App.css';
import styles from './Extension.module.css';
import { ExtensionModal } from './components/ExtensionModal';
import AppContext from './services/AppContext';
import { useSettinngsStateWithLocalStorage } from './services';
import openButton from './assets/lamp.svg'; 

function App() {
  const [detailsOpened, showDetails] = useState(false);
  const [extSettings, setExtSettings] = useSettinngsStateWithLocalStorage();
  const { lang, switchLang, currentLangData } = useContext(AppContext);
    
  const saveExtSettings = (obj) => {
    const toSave = {
      ...extSettings,
      ...obj,
    };
    setExtSettings(toSave);
    if (toSave.language !== lang) {
      switchLang(toSave.language);
    }
  };

  return (
    <div className={styles.container} style={{
      ...(extSettings.verticalPosition === 'top' ? {top: 0} : {bottom: 0}),
      ...(extSettings.horizontalPosition === 'left' ? {left: 0} : {right: 0}),      
    }}>
      <Image src={openButton} size='tiny' onClick={() => showDetails(true)} />
      <ExtensionModal
        openState={detailsOpened}
        close={() => { showDetails(false) }}
        extensionSettings={extSettings}
        saveExtensionSettings={saveExtSettings}
      />
    </div>
  );
}

export default App;
