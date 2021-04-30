import React, { useCallback, useEffect, useState } from 'react';
import { DEFAULT_NOTE, INote } from '../../components/note';
import AddButton from '../../components/button/AddButton';
import { generateId } from '../../utils';
import { DeleteIcon } from '../../components/icon';
import Button, { ButtonSize } from '../../components/button/Button';
import './styles.css';
import BaseController from '../controllers/BaseController';
import useLocalStorage from '../../components/local-storage/useLocalStorage';

const NEW_NOTE_OFFSET = 20;

const createNewNote = (notesLength: number): INote => ({
  ...DEFAULT_NOTE,
  top: DEFAULT_NOTE.top + NEW_NOTE_OFFSET * notesLength,
  left: DEFAULT_NOTE.left + NEW_NOTE_OFFSET * notesLength,
  noteId: generateId(),
  order: notesLength,
});

// change notes order property, because we remove current note to the end
const changeNotesOrder = (noteId: string, notes: Record<string, INote>): void => {
  const notesKeys = Object.keys(notes);
  let noteIndex = 0;
  notesKeys.forEach((noteKey, index) => {
    if (noteKey === noteId) {
      noteIndex = index;
      notes[noteKey].order = notesKeys.length - 1;
    }
    if (index > noteIndex) {
      notes[noteKey].order = index - 1;
    }
  });
};

const Workspace: React.FC = (): JSX.Element => {
  const [notes, setNotes] = useState<Record<string, INote>>({});
  const {
    storageSaveItem,
    storageDeleteItem,
    storageUpdateItemsProp,
    storageGetAll,
    storageClearAll,
  } = useLocalStorage();

  const createNote = useCallback(() => {
    const notesKeys = Object.keys(notes);
    const newNote = createNewNote(notesKeys.length);
    setNotes({
      ...notes,
      [newNote.noteId]: newNote,
    });

    storageSaveItem(newNote.noteId, newNote);
  }, [notes, storageSaveItem]);

  const moveNoteToFront = useCallback(
    (noteId: string) => {
      const notesClone = { ...notes };

      changeNotesOrder(noteId, notesClone);

      const noteForMove = { ...notesClone[noteId] };
      delete notesClone[noteId];

      const newNotes = {
        ...notesClone,
        [noteId]: noteForMove,
      };
      setNotes(newNotes);

      storageUpdateItemsProp(newNotes, 'order');
    },
    [notes, storageUpdateItemsProp],
  );

  const deleteNote = useCallback(
    (noteId: string) => {
      const notesClone = { ...notes };

      changeNotesOrder(noteId, notesClone);

      delete notesClone[noteId];
      const newNotes = {
        ...notesClone,
      };
      setNotes(newNotes);

      storageDeleteItem(noteId);
    },
    [notes, storageDeleteItem],
  );

  useEffect(() => {
    const notes = storageGetAll();
    const notesByOrder = Object.keys(notes)
      .sort((a, b) => notes[a].order - notes[b].order)
      .reduce((acc, key) => ({ ...acc, [key]: notes[key] }), {});

    setNotes(notesByOrder);

    return () => storageClearAll();
  }, []);

  return (
    <div className="workspace">
      <header className="header">Sticky Notes</header>
      <AddButton onClick={createNote} />
      <BaseController items={notes} moveNoteToFront={moveNoteToFront} deleteNote={deleteNote} />
      <div className="trash">
        <Button className="delete-button" icon={<DeleteIcon />} size={ButtonSize.L} />
      </div>
    </div>
  );
};

export default Workspace;
