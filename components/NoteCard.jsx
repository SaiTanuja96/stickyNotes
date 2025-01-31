import React, { useRef, useEffect, useState,useContext } from "react";
import Trash from "../icons/Trash";
import { setNewOffset, autoGrow, setZIndex, bodyParser } from "../utils.js";
import { db } from "../appwrite/databases";
import Spinner from "../icons/Spinner.jsx";
import DeleteButton from "./DeleteButton.jsx";
import { NoteContext } from "../context/NoteContext";

const NoteCard = ({ note,setNotes }) => {
  const [saving, setSaving] = useState(false);
  const keyUpTimer = useRef(null);
  const colors = JSON.parse(note.colors);
  const body = bodyParser(note.body);
  const textAreaRef = useRef(null);
  let mouseStartPos = { x: 0, y: 0 };
  const { setSelectedNote } = useContext(NoteContext);
  const cardRef = useRef(null);
  const [position, setPosition] = useState(JSON.parse(note.position));
  const saveData = async (key, value) => {
    const payload = { [key]: JSON.stringify(value) };
    try {
      await db.notes.update(note.$id, payload);
    } catch (error) {
      console.error(error);
    }
    setSaving(false);
  };
  const handleKeyUp = async () => {
    //1 - Initiate "saving" state
    setSaving(true);

    //2 - If we have a timer id, clear it so we can add another two seconds
    if (keyUpTimer.current) {
      clearTimeout(keyUpTimer.current);
    }

    //3 - Set timer to trigger save in 2 seconds
    keyUpTimer.current = setTimeout(() => {
      saveData("body", textAreaRef.current.value);
    }, 2000);
  };
  const mouseDown = (e) => {
    if (e.target.className === "card-header") {
 
        setZIndex(cardRef.current);
        setSelectedNote(note);
        mouseStartPos.x = e.clientX;
        mouseStartPos.y = e.clientY;
 
        document.addEventListener("mousemove", mouseMove);
        document.addEventListener("mouseup", mouseUp);
    }
  };
  const mouseUp = async () => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
    const newPosition = setNewOffset(cardRef.current); //{x,y}
    saveData("position", newPosition);
  };
  const mouseMove = (e) => {
    //1 - Calculate move direction
    setZIndex(cardRef.current);
    let mouseMoveDir = {
      x: mouseStartPos.x - e.clientX,
      y: mouseStartPos.y - e.clientY,
    };

    //2 - Update start position for next move.
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    //3 - Update card top and left position.
    const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
    setPosition(newPosition);
  };

  useEffect(() => {
    autoGrow(textAreaRef);
    setZIndex(cardRef.current);
  }, []);

  return (
    <div
      className="card"
      ref={cardRef}
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div
        className="card-header"
        style={{ backgroundColor: colors.colorHeader }}
        onMouseDown={mouseDown}
      >
<DeleteButton noteId={note.$id} setNotes={setNotes} />
        {saving && (
          <div className="card-saving">
            <Spinner color={colors.colorText} />
            <span style={{ color: colors.colorText }}>Saving...</span>{" "}
          </div>
        )}
        ;
      </div>
      <div className="card-body">
        <textarea
          ref={textAreaRef}
          style={{ color: colors.colorText }}
          defaultValue={body}
          onInput={() => autoGrow(textAreaRef)}
          onFocus={() => {
            setZIndex(cardRef.current);
            setSelectedNote(note);
          }}
          onKeyUp={handleKeyUp}
          
        ></textarea>
      </div>
    </div>
  );
};
export default NoteCard;
