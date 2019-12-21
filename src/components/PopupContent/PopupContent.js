import React from 'react';
import { Icon, Container, Divider, Header } from 'semantic-ui-react';
import { func, string, element } from 'prop-types';
import styles from './PopupContent.module.css';

const PopupContent = ({openSettings, closePopup, label, content}) => {
    return (
      <Container>
        <div className={styles.header}>
          <Icon link name='setting' size='large' className='greyed' onClick={() => openSettings()} />
          <Header as='h3' className={styles.header__caption}>{label}</Header>
          <div style={{paddingRight: '1em'}}>
            <Icon link name='close' size='large' className='greyed' onClick={() => closePopup()} />
          </div>
        </div>
        <Divider fitted />
        <Container className={styles.content}>{content}</Container>
      </Container>
    );
};

PopupContent.propTypes = {
    label: string.isRequired,
    openSettings: func.isRequired,
    closePopup: func.isRequired,
    content: element.isRequired,
};

export default PopupContent;