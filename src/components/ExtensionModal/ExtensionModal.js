import React, { useContext, useState } from 'react';
import { get } from 'lodash'
import { func, bool, object } from 'prop-types';
import { Icon, Modal, Grid, Menu } from 'semantic-ui-react';
import AppContext from '../../services/AppContext';
import { PopupContent, NoContentAvailable } from '../PopupContent';
import Settings from '../Settings';
import { SiteAddressContent, BonusesContent, FeedbacksContent, PricesContent } from '../TabsContents';
// import styles from './ExtensionModal.module.css';

const buttons = [
    { id: 'rating', icon: { name: 'star outline'}, disabled: true },
    { id: 'address', icon: { name: 'linkify', color: 'yellow' }, content: <SiteAddressContent /> },
    { id: 'bonuses', icon: { name: 'chess king', color: 'green'}, content: <BonusesContent /> },
    { id: 'feedbacks', icon: { name: 'comment outline'}, content: <FeedbacksContent /> },
    { id: 'prices', icon: { name: 'tag'}, content: <PricesContent /> },
];

const ExtensionModal = ({openState, close, extensionSettings, saveExtensionSettings }) => {
    const { currentLangData, connectionStatus } = useContext(AppContext);

    const [key, setKey] = useState('address');
    const [showSettings, setShowSettings] = useState(false);

    const handleItemClick = (_, { name }) => {
      setShowSettings(false);
      setKey(name);
    };
    return (
      <Modal open={openState} onClose={close}>
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
              closePopup={() => { !!showSettings ? setShowSettings(false) : close()}}
              label={get(currentLangData, !! showSettings ? `settings.header` : `main.buttons.${key}`, '')}
              content={
                !! showSettings ?
                  <Settings
                    data={extensionSettings}
                    save={saveExtensionSettings}
                  /> :
                (buttons.find(({ id }) => key === id) || {}).content || <NoContentAvailable />
              }
            />
          </Grid.Column>
        </Grid>
      </Modal>
    );
}

ExtensionModal.propTypes = {
    openState: bool.isRequired,
    close: func.isRequired,
    extensionSettings: object.isRequired,
    saveExtensionSettings: func.isRequired,

};

export default ExtensionModal;