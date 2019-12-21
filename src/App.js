import React, { useState, useContext } from 'react';
import { get } from 'lodash';
import { Button, Icon } from 'semantic-ui-react';
import './App.css';
import { ExtensionModal } from './components/ExtensionModal';
import AppContext from './services/AppContext';
import { useSettinngsStateWithLocalStorage } from './services';

const buttons = [
  { id: 'rating', icon: { name: 'star outline'}, disabled: true },
  { id: 'address', icon: { name: 'linkify', color: 'yellow' } },
  { id: 'bonuses', icon: { name: 'chess king', color: 'green'} },
  { id: 'feedbacks', icon: { name: 'comment outline'} },
  { id: 'prices', icon: { name: 'tag'} },
];

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
    <div className="ext-container" style={{
      ...(extSettings.verticalPosition === 'top' ? {top: 0} : {bottom: 0}),
      ...(extSettings.horizontalPosition === 'left' ? {left: 0} : {right: 0}),      
    }}>
      <Button.Group>
        {buttons/*.filter(({disabled}) => !disabled)*/.map(({ id, icon, disabled }) =>
          <Button key={id} size='big' disabled={disabled} basic onClick={() => showDetails(true)}>
            <div className='ext-button'>
              {icon && <Icon color={icon.color || 'grey'} name={icon.name} />}
              <span>{get(currentLangData, `main.buttons.${id}`, '')}</span>
            </div>
          </Button>
        )}
      </Button.Group>
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
