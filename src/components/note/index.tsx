import * as React from 'react';
import './styles.css';

export interface INote {
  noteId: string;
  text: string;
  left: number;
  top: number;
  order: number;
  width: number;
  height: number;
  minWidth?: number;
  minHeight?: number;
}

type IProps = Omit<INote, 'noteId' | 'order'> & {
  zIndex: number;
  ref?: React.Ref<HTMLDivElement>;
  onMouseDown(event: React.MouseEvent<HTMLDivElement>): void;
  onTextChange(event: React.ChangeEvent<HTMLTextAreaElement>): void;
};

export const DEFAULT_NOTE: INote = {
  noteId: '',
  text: '',
  top: 120,
  left: 30,
  order: 0,
  width: 200,
  height: 200,
  minWidth: 50,
  minHeight: 50,
};

// eslint-disable-next-line react/display-name
const Note: React.FC<IProps> = React.forwardRef<HTMLDivElement, IProps>(
  (props, ref): JSX.Element => {
    const { text, left, top, zIndex, onTextChange, onMouseDown, width, height } = props;

    return (
      <div
        ref={ref}
        className="note"
        style={{ left, top, zIndex, width, height }}
        onMouseDown={onMouseDown}
      >
        <textarea className="text-input" value={text} onChange={onTextChange} />
      </div>
    );
  },
);

export default Note;
