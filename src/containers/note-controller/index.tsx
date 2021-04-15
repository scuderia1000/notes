import * as React from 'react';
import Note, { INote } from '../../components/note';
import WithLocalStorage from '../../components/with-local-storage/WithLocalStorage';

type NotePosition = Pick<INote, 'left' | 'top'>;

interface Position {
  x: number;
  y: number;
}

export interface INoteControllerProps {
  note: INote;
  noteId: string;
  moveNoteToFront(noteId: string): void;
  storageReplaceItem?: (noteId: string, value: Record<string, any>) => void;
}

interface IState {
  zIndex: number;
  text: string;
  position: NotePosition;
  mouseNoteOffset: Position;
}

class NoteController extends React.Component<INoteControllerProps, IState> {
  readonly noteRef: React.RefObject<HTMLDivElement>;

  constructor(props: INoteControllerProps) {
    super(props);

    const { note } = props;
    const { left, top } = note;
    this.state = {
      zIndex: 1,
      text: note.text,
      position: {
        left,
        top,
      },
      mouseNoteOffset: {
        x: 0,
        y: 0,
      },
    };
    this.noteRef = React.createRef();
  }

  private onMouseDown = (event: React.MouseEvent<HTMLDivElement>): void => {
    const noteEl = this.noteRef.current;
    if (!noteEl) return;

    const noteRect = noteEl.getBoundingClientRect();
    this.setState({
      mouseNoteOffset: {
        x: event.pageX - noteRect.left,
        y: event.pageY - noteRect.top,
      },
      zIndex: 1000,
    });
    document.addEventListener('mousemove', this.onMouseMove);
  };

  private onMouseMove = (event: MouseEvent): void => {
    const { mouseNoteOffset } = this.state;

    const { x: mouseNoteOffsetX, y: mouseNoteOffsetY } = mouseNoteOffset;
    const left = event.pageX - mouseNoteOffsetX;
    const top = event.pageY - mouseNoteOffsetY;
    this.setState({
      position: { left, top }
    });
  };

  private onMouseUp = (): void => {
    const { storageReplaceItem, moveNoteToFront, noteId } = this.props;
    const { position } = this.state;
    moveNoteToFront(noteId);
    storageReplaceItem && storageReplaceItem(noteId, position);
    this.setState({
      zIndex: 1,
    })
    document.removeEventListener('mousemove', this.onMouseMove);
  };

  private onTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const { storageReplaceItem, noteId,  } = this.props;
    const value = event.currentTarget.value;
    this.setState({
      text: value,
    });
    storageReplaceItem && storageReplaceItem(noteId, { text: value });
  };

  render(): React.ReactNode {
    const { position, zIndex, text } = this.state;

    return (
      <Note
        text={text}
        left={position.left}
        top={position.top}
        ref={this.noteRef}
        zIndex={zIndex}
        onTextChange={this.onTextChange}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp} />
    )
  }
}

export default WithLocalStorage(NoteController);
