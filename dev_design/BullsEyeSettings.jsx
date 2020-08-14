import React, {useEffect, useState} from 'react';
import ColorPicker from "@confirmit/react-color-picker";
import Input from "./Input.jsx"
//export const BullsEyeSettings = (settings) => {
export const BullsEyeSettings = () => {
    // const [colorsCount, setColorsCount] = useState(settings.colorsCount);
    // const [colors, setColors] = useState(settings.colors);
    const [colorsCount, setColorsCount] = useState(3);
    const [colors, setColors] = useState(["#ff00ff", "#00ff00"]);
    const updateColor = (newCount) => (currentColors) => {
        const diff = newCount - currentColors.length;
        if (diff === 0) return currentColors;
        if (diff > 0) {
            currentColors.push(...new Array(diff).fill("#fff"))
        } else {
            currentColors = currentColors.slice(0, currentColors.length + diff)
        }
        return currentColors;
    };
    const updateByIndex = (color, index) => {
        const copy = [...colors];
        copy[index] = color;
        setColors(copy);
    }
    useEffect(() => {
        const settings = {
            colors: colors,
            colorsCount: colorsCount
        }
        //customQuestion.saveChanges(settings, false);
    }, [colors, colorsCount])

    return (<>
        <Input />
        <input onChange={(e) => {
            setColorsCount(e.target.value);
            setColors(updateColor(e.target.value))
        }} value={colorsCount}></input>

        {
            colors.map((color, index) =>
                <ColorPicker
                    key = {index}
                    color = {color}
                    name = {"Maria"}
                    label = {index}
                    className={"Vita"}
                    onChange={
                        (newColor) => {
                            updateByIndex(newColor, index)
                        }
                    }/>)
        }
    </>)
}