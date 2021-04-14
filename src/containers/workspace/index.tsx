import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { DEFAULT_NOTE, INote } from '../../components/note';
import './styles.css';
import AddButton from '../../components/button/AddButton';
import NoteController from '../../containers/note-controller';
import generateId from '../../utils';

interface IProps {

}

const NEW_NOTE_OFFSET = 20;

const createNewNote = (notesLength: number): INote => ({
  ...DEFAULT_NOTE,
  top: DEFAULT_NOTE.top + (NEW_NOTE_OFFSET * notesLength),
  left: DEFAULT_NOTE.left + (NEW_NOTE_OFFSET * notesLength),
  noteId: generateId(),
});

const Workspace: React.FC<IProps> = () => {
  const [notes, setNotes] = useState<Record<string, INote>>({});

  const createNote = useCallback(() => {
    const notesKeys = Object.keys(notes);
    const newNote = createNewNote(notesKeys.length);

    localStorage.setItem(newNote.noteId, JSON.stringify(newNote));
    setNotes({
      ...notes,
      [newNote.noteId]: newNote,
    });
  }, [notes]);

  const moveNoteToFront = useCallback((noteId: string) => {
    const notesClone = { ...notes };
    delete notesClone[noteId];
    setNotes((prevNotes) => ({
      ...notesClone,
      [noteId]: prevNotes[noteId],
    }));

  }, [notes]);

  const notesItems = useMemo(
    () =>
      Object.keys(notes).map((key) => (
        <NoteController key={key} note={notes[key]} noteId={key} moveNoteToFront={moveNoteToFront}/>
      )), [
      notes,
    ]);

  useEffect(() => {
    const notes = Object.keys(localStorage).reduce(
      (acc, key) => ({ ...acc, [key]: JSON.parse(localStorage[key]) }),
      {},
    );
    setNotes(notes);

    return () => {
      localStorage.clear();
    }
  }, []);

  return (
    <div className="workspace">
      <AddButton onClick={createNote}/>
      {notesItems}
    </div>
  )
}

export default Workspace;
