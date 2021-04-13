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
  const [notes, setNotes] = useState<Record<number, INote>>({});

  const handleAddNote = useCallback(() => {
    const notesKeys = Object.keys(notes);
    const newNote = createNote(notesKeys.length);

    localStorage.setItem(String(notesKeys.length), JSON.stringify(newNote));
    setNotes({
      ...notes,
      [notesKeys.length]: newNote,
    });
  }, [notes]);

  const addNoteToFront = useCallback((noteKey: number) => {

  }, [notes]);

  const notesItems = useMemo(
    () =>
      Object.keys(notes).map((key) => (
        <NoteController key={key} note={notes[+key]} noteKey={+key}/>
      )), [
      notes,
    ]);

  useEffect(() => {
    const notes = Object.keys(localStorage).reduce(
      (acc, key) => ({ ...acc, [+key]: JSON.parse(localStorage[key]) }),
      {},
    );
    setNotes(notes);

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
