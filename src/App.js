import React, { useState } from 'react';
import { Button, Icon, Modal, Grid, Menu } from 'semantic-ui-react';
import './App.css';
import Settings from './components/Settings';
import { PopupContent, NoContentAvailable } from './components/PopupContent';
import { useSettinngsStateWithLocalStorage } from './services';
import { SiteAddressContent, BonusesContent } from './components/TabsContents';

const buttons = [
  { id: 'rating', label: 'Rating', icon: { name: 'star outline'}, disabled: true },
  { id: 'address', label: 'WWW address', icon: { name: 'circle outline', color: 'yellow' }, content: <SiteAddressContent /> },
  { id: 'bonuses', label: 'Bonuses', icon: { name: 'money bill alternate outline', color: 'green'}, content: <BonusesContent /> },
  { id: 'feedbacks', label: 'Feedbacks', icon: { name: 'comment outline'}, disabled: true },
  { id: 'prices', label: 'Prices', icon: { name: 'money'}, disabled: true },
];

function App() {
  const [key, setKey] = useState('address');
  const [detailsOpened, showDetails] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [extSettings, setExtSettings] = useSettinngsStateWithLocalStorage();
    
  const handleClose = () => setShowSettings(false);
  const saveExtSettings = (obj) => setExtSettings({
    ...extSettings,
    ...obj,
  });
  const showModal = (buttonId) => {
    showDetails(true);
    setKey(buttonId);
  }

  const handleItemClick = (_, { name }) => {
    setKey(name);
  };


  return (
    <div className="ext-container" style={{
      ...(extSettings.verticalPosition === 'top' ? {top: 0} : {bottom: 0}),
      ...(extSettings.horizontalPosition === 'left' ? {left: 0} : {right: 0}),      
    }}>
      <Button.Group>
        {buttons/*.filter(({disabled}) => !disabled)*/.map(({ id, label, icon, disabled }) =>
          <Button key={id} size='big' disabled={disabled} basic onClick={() => showModal(id)}>
            <div className='ext-button'>
              {icon && <Icon color={icon.color || 'grey'} name={icon.name} />}
              {label && <span>{label}</span>}
            </div>
          </Button>
        )}
      </Button.Group>

      <Modal open={detailsOpened} onClose={() => showDetails(false)}>
        <Grid>
          <Grid.Column width={4}>
            <Menu vertical tabular>
              {buttons.map(({ id, label, disabled }) => <Menu.Item
                key={id}
                name={id}
                content={label}
                disabled={disabled}
                active={key === id}
                onClick={handleItemClick}
              />)}
            </Menu>
          </Grid.Column>

          <Grid.Column width={12}>
            <PopupContent
              openSettings={() => setShowSettings(true)}
              closePopup={() => showDetails(false)}
              label={(buttons.find(({ id }) => key === id) || {}).label || ""}
              content={(buttons.find(({ id }) => key === id) || {}).content || <NoContentAvailable />}
            />
          </Grid.Column>
        </Grid>
      </Modal>
      <Modal
        open={showSettings}
        onClose={handleClose}
      >
        <Modal.Header>Settings</Modal.Header>
        <Modal.Content>
          <Settings
            data={extSettings}
            save={saveExtSettings}
          />
        </Modal.Content>
      </Modal>
    </div>
  );
}

export default App;
