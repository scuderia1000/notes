import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { INote } from '../../components/note';
import NoteController from './note-controller';

interface IProps {
  items: Record<string, INote>;
  moveNoteToFront(noteId: string): void;
  deleteNote(noteId: string): void;
}

const BaseController: React.FC<IProps> = ({ items, moveNoteToFront, deleteNote }) => {
  const [selectedNoteId, setSelectedNoteId] = useState<string>('');

  const onClickOutsideNote = useCallback(
    ({ target }: { target: EventTarget | null }): void => {
      if (!target) return;

      const targetClass = (target as Element).className;
      if (!['note', 'resize-corner', 'resize'].includes(targetClass)) {
        setSelectedNoteId('');
      }
    },
    [setSelectedNoteId],
  );

  useEffect(() => {
    document.addEventListener('click', onClickOutsideNote);
    return () => {
      document.removeEventListener('click', onClickOutsideNote);
    };
  }, []);

  return (
    <>
      {Object.keys(items).map((key) => (
        <NoteController
          key={key}
          note={items[key]}
          noteId={key}
          moveNoteToFront={moveNoteToFront}
          deleteNote={deleteNote}
          isSelected={selectedNoteId === key}
          setSelectedNoteId={setSelectedNoteId}
        />
      ))}
    </>
  );
};

export default BaseController;
