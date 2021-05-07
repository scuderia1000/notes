import * as React from 'react';
import Note, { INote } from '../../../components/note';
import WithLocalStorage from '../../../components/local-storage/WithLocalStorage';
import { isIntersects } from '../../../utils';
import { IPosition } from '../../../types';

type NotePosition = Pick<INote, 'top' | 'left'>;

export interface INoteControllerProps {
  note: INote;
  noteId: string;
  moveNoteToFront(noteId: string): void;
  deleteNote(noteId: string): void;
  storageReplaceItem?: (noteId: string, value: Record<string, INote[keyof INote]>) => void;
  isSelected: boolean;
  setSelectedNoteId(id: string): void;
}

interface IState {
  zIndex: number;
  text: string;
  position: NotePosition;
  mouseNoteOffset: IPosition;
  observer?: IntersectionObserver;
  isEditMode: boolean;
}

class NoteController extends React.Component<INoteControllerProps, IState> {
  readonly noteRef: React.RefObject<HTMLTextAreaElement>;

  constructor(props: INoteControllerProps) {
    super(props);

    const { note } = props;
    const { top, left } = note;
    this.state = {
      zIndex: 1,
      text: note.text,
      position: {
        top,
        left,
      },
      mouseNoteOffset: {
        x: 0,
        y: 0,
      },
      observer: undefined,
      isEditMode: false,
    };
    this.noteRef = React.createRef();
  }

  private onMouseDown = (event: React.MouseEvent<HTMLTextAreaElement>): void => {
    const { setSelectedNoteId, noteId } = this.props;
    const noteEl = this.noteRef.current;
    if (!noteEl) return;
    const noteRect = noteEl.getBoundingClientRect();
    this.setState({
      mouseNoteOffset: {
        x: event.pageX - noteRect.left,
        y: event.pageY - noteRect.top,
      },
      zIndex: 999,
    });
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);

    setSelectedNoteId(noteId);
  };

  private onMouseMove = (event: MouseEvent): void => {
    const { mouseNoteOffset } = this.state;
    const noteEl = this.noteRef.current;
    if (!noteEl) return;

    const note = noteEl.getBoundingClientRect();

    const { x: mouseNoteOffsetX, y: mouseNoteOffsetY } = mouseNoteOffset;
    const left = event.pageX - mouseNoteOffsetX;
    let top = event.pageY - mouseNoteOffsetY;

    if (top < 0) {
      top = 0;
    } else if (top + note.height > window.innerHeight) {
      top = window.innerHeight - note.height;
    }
    this.setState({
      position: { left, top },
    });

    event.preventDefault();
  };

  private onMouseUp = (): void => {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);

    const { storageReplaceItem, moveNoteToFront, noteId } = this.props;
    const isNoteDeleted = this.deleteNoteIfNeeded();
    if (isNoteDeleted) return;

    const { position } = this.state;
    moveNoteToFront(noteId);
    storageReplaceItem && storageReplaceItem(noteId, position);
    this.setState({
      zIndex: 1,
    });
  };

  private onTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const { storageReplaceItem, noteId } = this.props;
    const { value } = event.currentTarget;
    this.setState({
      text: value,
    });
    storageReplaceItem && storageReplaceItem(noteId, { text: value });
  };

  private deleteNoteIfNeeded = (): boolean => {
    const { noteId, deleteNote } = this.props;
    const noteEl = this.noteRef.current;
    const trashEl = document.getElementsByClassName('trash')[0];
    if (!noteEl || !trashEl) return false;

    const note = noteEl.getBoundingClientRect();
    const trash = trashEl.getBoundingClientRect();
    const isNoteNeedDeleted = isIntersects(note, trash);
    if (isNoteNeedDeleted) {
      deleteNote(noteId);
      return true;
    }
    return false;
  };

  private onDblClick = (): void => {
    this.setState({
      isEditMode: true,
    });
  };

  render(): React.ReactNode {
    const { noteId, isSelected, note } = this.props;
    const { width, height } = note;
    const { position, zIndex, text, isEditMode } = this.state;

    return (
      <Note
        noteId={noteId}
        text={text}
        left={position.left}
        top={position.top}
        forwardRef={this.noteRef}
        zIndex={zIndex}
        width={width}
        height={height}
        isEditMode={isEditMode}
        isSelected={isSelected}
        onTextChange={this.onTextChange}
        onMouseDown={this.onMouseDown}
        onDblClick={this.onDblClick}
      />
    );
  }
}

export default WithLocalStorage(NoteController);
