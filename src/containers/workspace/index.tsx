import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { DEFAULT_NOTE, INote } from '../../components/note';
import './styles.css';
import AddButton from '../../components/button/AddButton';
import NoteController from '../../containers/note-controller';
import generateId from '../../utils';
import WithLocalStorage from '../../components/with-local-storage/WithLocalStorage';

interface IProps {
  storageUpdateItemsProp?: (notes: Record<string, INote>, propName: string) => void;
  storageSaveItem?: (itemId: string, item: any) => void;
}

const NEW_NOTE_OFFSET = 20;

const createNewNote = (notesLength: number): INote => ({
  ...DEFAULT_NOTE,
  top: DEFAULT_NOTE.top + (NEW_NOTE_OFFSET * notesLength),
  left: DEFAULT_NOTE.left + (NEW_NOTE_OFFSET * notesLength),
  noteId: generateId(),
  order: notesLength,
});

const Workspace: React.FC<IProps> = ({ storageUpdateItemsProp, storageSaveItem }) => {
  const [notes, setNotes] = useState<Record<string, INote>>({});

  const createNote = useCallback(() => {
    const notesKeys = Object.keys(notes);
    const newNote = createNewNote(notesKeys.length);
    setNotes({
      ...notes,
      [newNote.noteId]: newNote,
    });

    storageSaveItem && storageSaveItem(newNote.noteId, newNote);
  }, [notes, storageSaveItem]);

  const moveNoteToFront = useCallback((noteId: string) => {
    const notesClone = {...notes};
    const notesKeys = Object.keys(notesClone);
    let noteIndex = 0;
    // change notes order property, because we remove current note to the end
    notesKeys.forEach((noteKey, index) => {
      if (noteKey === noteId) {
        noteIndex = index;
        notesClone[noteKey].order = notesKeys.length - 1;
      }
      if (index > noteIndex) {
        notesClone[noteKey].order = index - 1;
      }
    });
    const noteForMove = {...notesClone[noteId]};
    delete notesClone[noteId];

    const newNotes = {
      ...notesClone,
      [noteId]: noteForMove,
    }
    setNotes(newNotes);

    storageUpdateItemsProp && storageUpdateItemsProp(newNotes, 'order');
  }, [notes, storageUpdateItemsProp]);

  const notesItems = useMemo(
    () =>
      Object.keys(notes).map((key) => (
        <NoteController key={key} note={notes[key]} noteId={key} moveNoteToFront={moveNoteToFront}/>
      )), [
      notes, moveNoteToFront,
    ]);

  useEffect(() => {
    const notes: Record<string, INote> = Object.keys(localStorage).reduce(
      (acc, key) => ({...acc, [key]: JSON.parse(localStorage[key])}),
      {},
    );
    const notesByOrder = Object.keys(notes)
      .sort((a, b) => notes[a].order - notes[b].order)
      .reduce((acc, key) => ({ ...acc, [key]: notes[key] }), {});

    setNotes(notesByOrder);

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

export default WithLocalStorage(Workspace);
