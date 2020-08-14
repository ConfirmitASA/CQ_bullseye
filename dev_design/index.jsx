import React from 'react';
import ReactDOM from 'react-dom';
import {BullsEyeSettings} from './BullsEyeSettings.jsx'

//function setValues(settings) {
    ReactDOM.render(
        //<BullsEyeSettings {...settings}/>,
        <BullsEyeSettings />,
        document.getElementById('colorPickerContainer')
    )
//}
//customQuestion.onSettingsReceived = setValues;
