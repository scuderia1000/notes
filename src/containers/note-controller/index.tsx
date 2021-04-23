import * as React from 'react';
import Note, { DEFAULT_NOTE, INote } from '../../components/note';
import WithLocalStorage from '../../components/with-local-storage/WithLocalStorage';
import { isIntersects } from '../../utils';
import './style.css';

type NotePosition = Pick<INote, 'left' | 'top'>;

interface Position {
  x: number;
  y: number;
}

export interface INoteControllerProps {
  note: INote;
  noteId: string;
  moveNoteToFront(noteId: string): void;
  deleteNote(noteId: string): void;
  storageReplaceItem?: (noteId: string, value: Record<string, any>) => void;
}

interface IState {
  zIndex: number;
  text: string;
  position: NotePosition;
  mouseNoteOffset: Position;
  observer?: IntersectionObserver;
  isResizeShown: boolean;
  width: number;
  height: number;
  initialWidth: number;
  initialHeight: number;
}

class NoteController extends React.Component<INoteControllerProps, IState> {
  readonly noteRef: React.RefObject<HTMLDivElement>;

  readonly resizeRef: React.RefObject<HTMLDivElement>;

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
      observer: undefined,
      isResizeShown: false,
      width: DEFAULT_NOTE.width,
      height: DEFAULT_NOTE.height,
      initialWidth: DEFAULT_NOTE.width,
      initialHeight: DEFAULT_NOTE.height,
    };
    this.noteRef = React.createRef();
    this.resizeRef = React.createRef();
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
      zIndex: 999,
      isResizeShown: true,
    });
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
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

  private onResizeMouseDown = (event: React.MouseEvent<HTMLDivElement>): void => {
    this.setState({
      mouseNoteOffset: {
        x: event.pageX,
        y: event.pageY,
      },
      zIndex: 999,
    });
    document.addEventListener('mousemove', this.onResizeMouseMove);
    document.addEventListener('mouseup', this.onResizeMouseUp);
  };

  private onResizeMouseMove = (event: MouseEvent): void => {
    const { mouseNoteOffset, initialWidth, initialHeight } = this.state;
    const { x: mouseNoteOffsetX, y: mouseNoteOffsetY } = mouseNoteOffset;

    const deltaX = event.pageX - mouseNoteOffsetX;
    const deltaY = event.pageY - mouseNoteOffsetY;
    let width = initialWidth + deltaX;
    let height = initialHeight + deltaY;
    if (DEFAULT_NOTE.minWidth && width < DEFAULT_NOTE.minWidth) {
      width = DEFAULT_NOTE.minWidth;
    }
    if (DEFAULT_NOTE.minHeight && height < DEFAULT_NOTE.minHeight) {
      height = DEFAULT_NOTE.minHeight;
    }

    this.setState({
      width,
      height,
    });
  };

  private onResizeMouseUp = (): void => {
    const { width, height } = this.state;
    document.removeEventListener('mousemove', this.onResizeMouseMove);
    document.removeEventListener('mouseup', this.onResizeMouseUp);

    this.setState({
      zIndex: 1,
      initialWidth: width,
      initialHeight: height,
    });
  };

  private onClickOutsideNote = (event: MouseEvent): void => {
    const { isResizeShown } = this.state;
    const { target } = event;
    if (!target) return;

    if (
      !['resize', 'note', 'text-input', 'resize-corner'].includes((target as Element).className) &&
      isResizeShown
    ) {
      this.setState({
        isResizeShown: false,
      });
    }
  };

  public componentDidMount(): void {
    document.addEventListener('click', this.onClickOutsideNote);
  }

  public componentWillUnmount(): void {
    document.removeEventListener('click', this.onClickOutsideNote);
  }

  render(): React.ReactNode {
    const { position, zIndex, text, isResizeShown, width, height } = this.state;

    return (
      <>
        <Note
          text={text}
          left={position.left}
          top={position.top}
          ref={this.noteRef}
          zIndex={zIndex}
          width={width}
          height={height}
          onTextChange={this.onTextChange}
          onMouseDown={this.onMouseDown}
        />
        <div
          className="resize"
          ref={this.resizeRef}
          style={{
            left: position.left - 10,
            top: position.top - 10,
            opacity: isResizeShown ? 1 : 0,
            width: width + 20,
            height: height + 30,
          }}
        >
          <div className="resize-corner" onMouseDown={this.onResizeMouseDown} />
        </div>
      </>
    );
  }
}

export default WithLocalStorage(NoteController);
