import React, { useContext } from 'react';
import { get } from 'lodash'
import { func } from 'prop-types';
import { Form, Container, Button, Divider, Dropdown, Icon } from 'semantic-ui-react';
import AppContext from '../../services/AppContext';
import styles from './Settings.module.css';

const options = [
    { key: 'en', value: 'en-US' },
    { key: 'ru', value: 'ru-RU' },
];

const Settings = ({save, ...props}) => {
    const { currentLangData } = useContext(AppContext);

    return (
        <Container className={styles.container}>
            <Form>
                <Form.Field>
                    <label>{get(currentLangData, `settings.color-scheme.label`, '')}</label>   
                    <Button.Group>
                      <Button active icon>
                        <Icon name='check' color='green' />&nbsp;
                        {get(currentLangData, `settings.color-scheme.light`, '')}&nbsp;
                      </Button>
                      <Button disabled>{get(currentLangData, `settings.color-scheme.dark`, '')}</Button>
                    </Button.Group>
                </Form.Field>
                <Divider hidden />
                <Form.Field>
                    <label>{get(currentLangData, `settings.language`, '')}</label>
                    <Dropdown
                        selection
                        value={props.data.language}
                        options={options.map((o) => ({...o, text: get(currentLangData, `settings.languages.${o.key}`, '')}))}
                        onChange={(_, { value }) => save({language: value})}
                    />
                </Form.Field>
            </Form>
        </Container>
        //     <Form.Group inline>
        //         <label>{get(currentLangData, `settings.verticalPosition`, '')}</label>
        //         <Form.Radio
        //             label={get(currentLangData, `settings.top`, '')}
        //             value='top'
        //             checked={props.data.verticalPosition === 'top'}
        //             onChange={(_, { value }) => save({verticalPosition: value})}
        //         />
        //         <Form.Radio
        //             label={get(currentLangData, `settings.bottom`, '')}
        //             value='bottom'
        //             checked={props.data.verticalPosition === 'bottom'}
        //             onChange={(_, { value }) => save({verticalPosition: value})}
        //         />
        //     </Form.Group>
        //     <Form.Group inline>
        //         <label>{get(currentLangData, `settings.horizontalPosition`, '')}</label>
        //         <Form.Radio
        //             label={get(currentLangData, `settings.left`, '')}
        //             value='left'
        //             checked={props.data.horizontalPosition === 'left'}
        //             onChange={(_, { value }) => save({horizontalPosition: value})}
        //         />
        //         <Form.Radio
        //             label={get(currentLangData, `settings.right`, '')}
        //             value='right'
        //             checked={props.data.horizontalPosition === 'right'}
        //             onChange={(_, { value }) => save({horizontalPosition: value})}
        //         />
        //     </Form.Group>
    );
}

Settings.propTypes = {
    save: func.isRequired,
};

export default Settings;