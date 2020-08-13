import ColorPicker from "@confirmit/react-color-picker"
import React, {useState} from "react"

export default function My() {
    const [color, setColor] = useState("#ff0000");
    return <ColorPicker color={color} onChange={(color) => {
        console.log(color);
        setColor(color);
        //let settings = { colorpicker: color};
        //customQuestion.saveChanges(settings, false)
    }}/>

}


