import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { DEFAULT_NOTE, INote } from '../../components/note';
import './styles.css';
import AddButton from '../../components/button/AddButton';
import NoteController from '../../containers/note-controller';

interface IProps {

}

const NEW_NOTE_OFFSET = 20;

const createNote = (notesLength: number): INote => ({
  ...DEFAULT_NOTE,
  top: DEFAULT_NOTE.top + (NEW_NOTE_OFFSET * notesLength),
  left: DEFAULT_NOTE.left + (NEW_NOTE_OFFSET * notesLength),
});

const Workspace: React.FC<IProps> = () => {
  const [notes, setNotes] = useState<INote[]>([]);

  const handleAddNote = useCallback(() => {
    const newNote = createNote(notes.length);
    localStorage.setItem(String(notes.length), JSON.stringify(newNote));
    setNotes((prevState) => [...prevState, newNote]);
  }, [notes]);

  const notesItems = useMemo(() => notes.map((note, index) => <NoteController key={index} note={note} noteKey={index}/>), [
    notes,
  ]);

  useEffect(() => {
    const notes = Object.keys(localStorage).map((noteKey) => JSON.parse(localStorage[noteKey]));
    setNotes(notes);
    // setNotes(notes.length ? notes : [{ ...DEFAULT_NOTE, text: '22', noteKey: 0 }]);

    return () => {
      localStorage.clear();
    }
  }, []);

  return (
    <div className="workspace">
      <AddButton onClick={handleAddNote}/>
      {notesItems}
    </div>
  )
}

export default Workspace;
