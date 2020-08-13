import React, {useEffect, useState} from 'react';
import ColorPicker from "@confirmit/react-color-picker";

export const BullsEyeSettings = (settings) => {

    const [colorsCount, setColorsCount] = useState(settings.colorsCount);
    const [colors, setColors] = useState(settings.colors);
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
        customQuestion.saveChanges(settings, false);
    }, [colors, colorsCount])
    console.log("I did it")
    return (<>
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