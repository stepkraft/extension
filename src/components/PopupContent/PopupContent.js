import React from 'react';
import { Icon, Container, Divider, Header } from 'semantic-ui-react';
import { func, string, element } from 'prop-types';

const PopupContent = ({openSettings, closePopup, label, content}) => {
    return (
      <Container>
        <div className='popup-header'>
          <Icon link name='setting' onClick={() => openSettings()} />
          <Header as='h2'>{label}</Header>
          <div style={{paddingRight: '1em'}}>
            <Icon link name='close' onClick={() => closePopup()} />
          </div>
        </div>
        <Divider />
        <Container>{content}</Container>
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