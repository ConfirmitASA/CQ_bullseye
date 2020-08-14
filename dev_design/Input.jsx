import React from 'react';
import './Input.css';

export const Input = () => {
    return (

        <div className="node-property1">
            <label className="node-property__label" htmlFor="size">{"ds"}</label>
            <input  className="form-control input-sm form-input form-input--8ch" type="text" id="size"/>
        </div>

    );
}

export default Input;