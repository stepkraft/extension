import React from 'react';

// TODO: add store for extension
const useSettinngsStateWithLocalStorage = () => {
    const savedData = JSON.parse(localStorage.getItem('ext-settings') || '{}');
    const {
        verticalPosition = 'top',
        horizontalPosition = 'right',
        language = 'en-US',
        theme = 'light'
    } = savedData;

    const [value, setValue] = React.useState({
        verticalPosition,
        horizontalPosition,
        language,
        theme,
    });

    React.useEffect(() => {
        localStorage.setItem('ext-settings', JSON.stringify(value));
    }, [value]);

    return [value, setValue];
};

export default useSettinngsStateWithLocalStorage;