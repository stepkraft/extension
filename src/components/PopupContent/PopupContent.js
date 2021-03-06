import React from 'react';
import { Icon, Divider, Header } from 'semantic-ui-react';
import { func, string, element } from 'prop-types';
import styles from './PopupContent.module.css';

const PopupContent = ({openSettings, closePopup, label, content}) => {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <Icon link name='setting' size='large' className={styles['button--greyed']} onClick={() => openSettings()} />
          <Header as='h3' className={styles.header__caption}>{label}</Header>
          <Icon link name='close' size='large' className={styles['button--greyed']} onClick={() => closePopup()} />
        </div>
        <Divider fitted />
        <div className={styles.content}>{content}</div>
      </div>
    );
};

PopupContent.propTypes = {
    label: string.isRequired,
    openSettings: func.isRequired,
    closePopup: func.isRequired,
    content: element.isRequired,
};

export default PopupContent;