/*global chrome*/
import React from 'react';
import { keys } from 'lodash'

const defaults = {
    verticalPosition: 'top',
    horizontalPosition: 'left',
    language: 'en-US',
    theme: 'light'
};

const useSettinngsStateWithLocalStorage = () => {

    const [value, setValue] = React.useState( async () => {
        const updateStoredData = async () => {
            try {
                chrome.storage.local.get(
                    keys(defaults),
                    (result) => { setValue({ ...defaults, ...result }); }
                );
            } catch (er) {
                console.warn(er);
            }
        }
        updateStoredData();
        return {...defaults};
    });

    React.useEffect(() => {
        const updateStore = async () => {
            const newValue = await value;

            if (!newValue)
                return;

            try {
                chrome.storage.local.set(newValue);
            } catch(e) {
                console.warn(e);
            }
        }
        
        updateStore();

    }, [value]);

    // const savedData = JSON.parse(localStorage.getItem('ext-settings') || '{}');
    // const {
    //     verticalPosition = 'top',
    //     horizontalPosition = 'left',
    //     language = 'en-US',
    //     theme = 'light'
    // } = savedData;

    // const [value, setValue] = React.useState({
    //     verticalPosition,
    //     horizontalPosition,
    //     language,
    //     theme,
    // });
    // 
    // React.useEffect(() => {
    //     localStorage.setItem('ext-settings', JSON.stringify(value));
    // }, [value]);

    return [value, setValue];
};

export default useSettinngsStateWithLocalStorage;