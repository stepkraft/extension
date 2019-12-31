import React, { useContext, useState } from 'react';
import { get } from 'lodash'
import { func, bool, object } from 'prop-types';
import { Icon, Modal, Grid, Menu } from 'semantic-ui-react';
import AppContext from '../../services/AppContext';
import { PopupContent, NoContentAvailable } from '../PopupContent';
import Settings from '../Settings';
import { SiteAddressContent, BonusesContent, FeedbacksContent, PricesContent } from '../TabsContents';
import styles from './ExtensionModal.module.css';

const buttons = [
    { id: 'rating', icon: { name: 'star outline'}, disabled: true },
    { id: 'address', icon: { name: 'linkify', color: 'yellow' }, content: <SiteAddressContent /> },
    { id: 'bonuses', icon: { name: 'chess king', color: 'green'}, disabled: true, content: <BonusesContent /> },
    { id: 'feedbacks', icon: { name: 'comment outline'}, disabled: true, content: <FeedbacksContent /> },
    { id: 'prices', icon: { name: 'tag'}, disabled: true, content: <PricesContent /> },
];

const ExtensionModal = ({openState, close, extensionSettings, saveExtensionSettings }) => {
    const { currentLangData, connectionStatus } = useContext(AppContext);

    const [key, setKey] = useState('address');
    const [showSettings, setShowSettings] = useState(false);

    const handleItemClick = (_, { name }) => {
      setShowSettings(false);
      setKey(name);
    };

    const mountModal = (_, { dimmer }) => {
      if (!!dimmer) {
        document.getElementsByClassName('dimmer')[0].style.zIndex = 999999999;
      }      
    }
    
    return (
      <Modal open={openState} onClose={close} className={styles.extensionModal} onMount={mountModal}>
        <Grid>
          <Grid.Column width={6}>
            <Menu vertical tabular fluid className={styles.modalMenu}>
              {buttons.map(({ id, icon, disabled }) => <Menu.Item
                key={id}
                name={id}
                disabled={disabled}
                active={key === id}
                onClick={handleItemClick}
                className={`${styles.modalMenu__item} ${!!disabled ? styles['modalMenu__item--disabled'] : ''} ${key === id ? styles['modalMenu__item--active'] : ''}`}
              >
                <div className={styles.modalMenu__button}>
                  {icon && <Icon size='large' name={icon.name} className={styles.modalMenu__buttonIcon} />}
                  <span>{get(currentLangData, `main.buttons.${id}`, '')}</span>
                  {'address' === id && <Icon size='small' name='circle thin' color={!!connectionStatus ? 'green': 'yellow'} className={styles.modalMenu__connStatus} />}
                </div>
              </Menu.Item>)}
            </Menu>
          </Grid.Column>
          <Grid.Column width={10} className={`${styles.modalContent} row`}>
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