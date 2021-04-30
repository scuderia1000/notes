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

export type INoteProps = Omit<INote, 'order'> & {
  zIndex: number;
  isEditMode: boolean;
  isSelected: boolean;
  forwardRef: React.Ref<HTMLTextAreaElement>;
  onMouseDown(event: React.MouseEvent<HTMLTextAreaElement>): void;
  onTextChange(event: React.ChangeEvent<HTMLTextAreaElement>): void;
  onDblClick(): void;
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
      <textarea
        ref={ref}
        className="note"
        style={{ left, top, zIndex, width, height }}
        value={text}
        readOnly={!isEditMode}
        onMouseDown={onMouseDown}
        onChange={onTextChange}
        onDoubleClick={onDblClick}
      />
    );
  },
);

export default Note;
