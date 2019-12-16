import React, { useContext } from 'react';
import { get } from 'lodash'
import { func } from 'prop-types';
import { Form } from 'semantic-ui-react';
import AppContext from '../../services/AppContext';

const options = [
    { key: 'en', value: 'en-US' },
    { key: 'ru', value: 'ru-RU' },
];

const Settings = ({save, ...props}) => {
    const { currentLangData } = useContext(AppContext);

    return (
        <Form>
            <Form.Group inline>
                <label>{get(currentLangData, `settings.verticalPosition`, '')}</label>
                <Form.Radio
                    label={get(currentLangData, `settings.top`, '')}
                    value='top'
                    checked={props.data.verticalPosition === 'top'}
                    onChange={(_, { value }) => save({verticalPosition: value})}
                />
                <Form.Radio
                    label={get(currentLangData, `settings.bottom`, '')}
                    value='bottom'
                    checked={props.data.verticalPosition === 'bottom'}
                    onChange={(_, { value }) => save({verticalPosition: value})}
                />
            </Form.Group>
            <Form.Group inline>
                <label>{get(currentLangData, `settings.horizontalPosition`, '')}</label>
                <Form.Radio
                    label={get(currentLangData, `settings.left`, '')}
                    value='left'
                    checked={props.data.horizontalPosition === 'left'}
                    onChange={(_, { value }) => save({horizontalPosition: value})}
                />
                <Form.Radio
                    label={get(currentLangData, `settings.right`, '')}
                    value='right'
                    checked={props.data.horizontalPosition === 'right'}
                    onChange={(_, { value }) => save({horizontalPosition: value})}
                />
            </Form.Group>
            <Form.Group inline>
                <label>{get(currentLangData, `settings.language`, '')}</label>
                <Form.Select
                    fluid
                    options={options.map((o) => ({
                        ...o,
                        text: get(currentLangData, `settings.languages.${o.key}`, '')
                    }))}
                    value={props.data.language}
                    onChange={(_, { value }) => save({language: value})}
                />
            </Form.Group>
        </Form>
    );
}

Settings.propTypes = {
    save: func.isRequired,
};

export default Settings;