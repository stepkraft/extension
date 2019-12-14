import React, { useState, useContext } from 'react';
import { get } from 'lodash';
import { Button, Icon, Modal, Grid, Menu } from 'semantic-ui-react';
import './App.css';
import Settings from './components/Settings';
import { PopupContent, NoContentAvailable } from './components/PopupContent';
import LangContext from './services/LangContext';
import { useSettinngsStateWithLocalStorage } from './services';
import { SiteAddressContent, BonusesContent } from './components/TabsContents';

const buttons = [
  { id: 'rating', icon: { name: 'star outline'}, disabled: true },
  { id: 'address', icon: { name: 'circle outline', color: 'yellow' }, content: <SiteAddressContent /> },
  { id: 'bonuses', icon: { name: 'money bill alternate outline', color: 'green'}, content: <BonusesContent /> },
  { id: 'feedbacks', icon: { name: 'comment outline'}, disabled: true },
  { id: 'prices', icon: { name: 'money'}, disabled: true },
];

function App() {
  const [key, setKey] = useState('address');
  const [detailsOpened, showDetails] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [extSettings, setExtSettings] = useSettinngsStateWithLocalStorage();
  const { lang, switchLang, currentLangData } = useContext(LangContext);
    
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
  const showModal = (buttonId) => {
    showDetails(true);
    setKey(buttonId);
  }

  const handleItemClick = (_, { name }) => {
    setShowSettings(false);
    setKey(name);
  };

return (
    <div className="ext-container" style={{
      ...(extSettings.verticalPosition === 'top' ? {top: 0} : {bottom: 0}),
      ...(extSettings.horizontalPosition === 'left' ? {left: 0} : {right: 0}),      
    }}>
      <Button.Group>
        {buttons/*.filter(({disabled}) => !disabled)*/.map(({ id, icon, disabled }) =>
          <Button key={id} size='big' disabled={disabled} basic onClick={() => showModal(id)}>
            <div className='ext-button'>
              {icon && <Icon color={icon.color || 'grey'} name={icon.name} />}
              <span>{get(currentLangData, `main.buttons.${id}`, '')}</span>
            </div>
          </Button>
        )}
      </Button.Group>

      <Modal open={detailsOpened} onClose={() => showDetails(false)}>
        <Grid>
          <Grid.Column width={4}>
            <Menu vertical tabular>
              {buttons.map(({ id, disabled }) => <Menu.Item
                key={id}
                name={id}
                content={get(currentLangData, `main.buttons.${id}`, '')}
                disabled={disabled}
                active={key === id}
                onClick={handleItemClick}
              />)}
            </Menu>
          </Grid.Column>

          <Grid.Column width={12}>
            <PopupContent
              openSettings={() => setShowSettings(true)}
              closePopup={() => { !!showSettings ? setShowSettings(false) : showDetails(false)}}
              label={get(currentLangData, `main.buttons.${key}`, '')}
              content={
                !! showSettings ?
                  <Settings
                    data={extSettings}
                    save={saveExtSettings}
                  /> :
                (buttons.find(({ id }) => key === id) || {}).content || <NoContentAvailable />
              }
            />
          </Grid.Column>
        </Grid>
      </Modal>
    </div>
  );
}

export default App;
