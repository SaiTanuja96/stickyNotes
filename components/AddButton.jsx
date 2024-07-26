import colors from "../assets/colors.json";
import { useContext,useRef } from "react";
import { NoteContext } from "../context/NoteContext";
import Plus from "../icons/Plus";
import { db } from "../appwrite/databases";

const AddButton = () => {
    const startingPos = useRef(10);
    const { setNotes } = useContext(NoteContext);
    console.log(setNotes)
    const addNote = async () => {
        const payload = {
            position: JSON.stringify({
                x: startingPos.current,
                y: startingPos.current,
            }),
            colors: JSON.stringify(colors[0]),
        };
 
        startingPos.current += 10;
 
        const response = await db.notes.create(payload);
        setNotes((prevState) => [response, ...prevState]);
    };
 
    return (
        <div id="add-btn" onClick={addNote}>
            <Plus />
        </div>
    );
};
export default AddButton