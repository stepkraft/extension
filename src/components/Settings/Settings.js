import React from 'react';
import { func } from 'prop-types';
import { Form } from 'semantic-ui-react'

const Settings = ({save, ...props}) => {
    return (
        <Form>
            <Form.Group inline>
                <label>vertical position</label>
                <Form.Radio
                    label='top'
                    value='top'
                    checked={props.data.verticalPosition === 'top'}
                    onChange={(_, { value }) => save({verticalPosition: value})}
                />
                <Form.Radio
                    label='bottom'
                    value='bottom'
                    checked={props.data.verticalPosition === 'bottom'}
                    onChange={(_, { value }) => save({verticalPosition: value})}
                />
            </Form.Group>
            <Form.Group inline>
                <label>horizontal position</label>
                <Form.Radio
                    label='left'
                    value='left'
                    checked={props.data.horizontalPosition === 'left'}
                    onChange={(_, { value }) => save({horizontalPosition: value})}
                />
                <Form.Radio
                    label='right'
                    value='right'
                    checked={props.data.horizontalPosition === 'right'}
                    onChange={(_, { value }) => save({horizontalPosition: value})}
                />
            </Form.Group>
        </Form>
    );
}

Settings.propTypes = {
    save: func.isRequired,
};

export default Settings;