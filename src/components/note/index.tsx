import * as React from 'react';
import './styles.css';

export interface INote {
  noteId: string;
  text: string;
  left: number;
  top: number;
  order: number;
}

type IProps = Omit<INote, 'noteId' | 'order'> & {
  zIndex: number;
  ref?: React.Ref<HTMLDivElement>;
  onMouseDown(event: React.MouseEvent<HTMLDivElement>): void;
  onMouseUp(): void;
  onTextChange(event: React.ChangeEvent<HTMLTextAreaElement>): void;
};

export const DEFAULT_NOTE: INote = {
  noteId: '',
  text: '',
  top: 120,
  left: 30,
  order: 0,
};

// eslint-disable-next-line react/display-name
const Note: React.FC<IProps> = React.forwardRef<HTMLDivElement, IProps>(
  (props, ref): JSX.Element => {
    const { text, left, top, zIndex, onTextChange, onMouseDown, onMouseUp } = props;

    return (
      <div
        ref={ref}
        className="note"
        style={{ left, top, zIndex }}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      >
        <textarea value={text} onChange={onTextChange} />
      </div>
    );
  },
);

export default Note;
