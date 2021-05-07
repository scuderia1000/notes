import * as React from 'react';
import './styles.css';
import WithResize from '../with-resize/WithResize';

export const NEW_NOTE_OFFSET = 20;
export const NOTE_DEFAULT_SIZE = 200;

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

export type INoteProps = Omit<INote, 'order'> & {
  zIndex: number;
  isEditMode: boolean;
  isSelected: boolean;
  forwardRef: React.Ref<HTMLTextAreaElement>;
  onMouseDown(event: React.MouseEvent<HTMLTextAreaElement>): void;
  onTextChange(event: React.ChangeEvent<HTMLTextAreaElement>): void;
  onDblClick(): void;
  onResize?(): void;
};

export const DEFAULT_NOTE: INote = {
  noteId: '',
  text: '',
  top: 120,
  left: 30,
  order: 0,
  width: NOTE_DEFAULT_SIZE,
  height: NOTE_DEFAULT_SIZE,
  minWidth: 50,
  minHeight: 50,
};

// eslint-disable-next-line react/display-name
const Note: React.FC<INoteProps> = React.forwardRef<HTMLTextAreaElement, INoteProps>(
  (props, ref): JSX.Element => {
    const {
      text,
      left,
      top,
      zIndex,
      onTextChange,
      onMouseDown,
      width,
      height,
      onDblClick,
      isEditMode,
    } = props;

    return (
      <div className="note" style={{ left, top, width, height, zIndex }}>
        <textarea
          className="note-input"
          ref={ref}
          value={text}
          readOnly={!isEditMode}
          onMouseDown={onMouseDown}
          onChange={onTextChange}
          onDoubleClick={onDblClick}
        />
      </div>
    );
  },
);

export default WithResize(Note);
