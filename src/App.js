import React, { useState, useContext } from 'react';
import { get } from 'lodash';
import { Button, Icon, Modal, Grid, Menu } from 'semantic-ui-react';
import './App.css';
import Settings from './components/Settings';
import { PopupContent, NoContentAvailable } from './components/PopupContent';
import AppContext from './services/AppContext';
import { useSettinngsStateWithLocalStorage } from './services';
import { SiteAddressContent, BonusesContent } from './components/TabsContents';

const buttons = [
  { id: 'rating', icon: { name: 'star outline'}, disabled: true },
  { id: 'address', icon: { name: 'linkify', color: 'yellow' }, content: <SiteAddressContent /> },
  { id: 'bonuses', icon: { name: 'chess king', color: 'green'}, content: <BonusesContent /> },
  { id: 'feedbacks', icon: { name: 'comment outline'}, disabled: true },
  { id: 'prices', icon: { name: 'tag'}, disabled: true },
];

function App() {
  const [key, setKey] = useState('address');
  const [detailsOpened, showDetails] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [extSettings, setExtSettings] = useSettinngsStateWithLocalStorage();
  const { lang, switchLang, currentLangData, connectionStatus } = useContext(AppContext);
    
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
          <Grid.Column width={6} className="ext-modal-menu-column">
            <Menu vertical tabular fluid>
              {buttons.map(({ id, icon, disabled }) => <Menu.Item
                key={id}
                name={id}
                disabled={disabled}
                active={key === id}
                onClick={handleItemClick}
              >
                <div className='ext-modal-menu-button'>
                  {icon && <Icon size='large' name={icon.name} />}
                  <span>{get(currentLangData, `main.buttons.${id}`, '')}</span>
                  {'address' === id && <Icon size='small' name='circle thin' color={!!connectionStatus ? 'green': 'yellow'} className='connection-status' />}
                </div>
              </Menu.Item>)}
            </Menu>
          </Grid.Column>
          <Grid.Column width={10} className="ext-modal-content-column row">
            <PopupContent
              openSettings={() => setShowSettings(true)}
              closePopup={() => { !!showSettings ? setShowSettings(false) : showDetails(false)}}
              label={get(currentLangData, !! showSettings ? `settings.header` : `main.buttons.${key}`, '')}
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
