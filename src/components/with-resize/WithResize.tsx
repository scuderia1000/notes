import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { IPosition, ISize } from '../../types';
import { DEFAULT_NOTE, INoteProps } from '../note';
import useLocalStorage from '../local-storage/useLocalStorage';
import './style.css';

enum ResizeCornerType {
  TOP_LEFT = 'top-left',
  TOP_RIGHT = 'top-right',
  BOTTOM_RIGHT = 'bottom-right',
  BOTTOM_LEFT = 'bottom-left',
}

type IProps = INoteProps & {};

const WithResize = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
): React.FC<P & IProps> => (props): JSX.Element => {
  const { noteId, width, height, left, top, isSelected, forwardRef, zIndex: noteZIndex } = props;

  const { storageReplaceItem } = useLocalStorage();

  const [initialMousePosition, setInitialMousePosition] = useState<IPosition>({ x: 0, y: 0 });
  const [leftTopPosition, setLeftTopPosition] = useState<IPosition>({ x: left, y: top });
  const [initialSize, setInitialSize] = useState<ISize>({ width, height });
  const [size, setSize] = useState<ISize>({ width, height });
  const [zIndex, setZIndex] = useState<number>(1);
  const [isDrag, setIsDrag] = useState<boolean>(false);

  const resizeZIndex = noteZIndex > zIndex ? noteZIndex : zIndex;

  const onResizeMouseMove = useCallback(
    (event: MouseEvent): void => {
      if (!isDrag) return;

      const deltaX = event.pageX - initialMousePosition.x;
      const deltaY = event.pageY - initialMousePosition.y;
      let width = initialSize.width + deltaX;
      let height = initialSize.height + deltaY;
      if (DEFAULT_NOTE.minWidth && width < DEFAULT_NOTE.minWidth) {
        width = DEFAULT_NOTE.minWidth;
      }
      if (DEFAULT_NOTE.minHeight && height < DEFAULT_NOTE.minHeight) {
        height = DEFAULT_NOTE.minHeight;
      }

      setSize({
        width,
        height,
      });

      event.preventDefault();
    },
    [initialMousePosition, initialSize, setSize, isDrag],
  );

  const onResizeMouseUp = useCallback((): void => {
    if (!isDrag) return;

    const { width, height } = size;
    setInitialSize({
      width,
      height,
    });
    setZIndex(1);
    setIsDrag(false);
    setInitialMousePosition({ x: 0, y: 0 });

    storageReplaceItem(noteId, { width, height });
  }, [storageReplaceItem, size, setInitialSize, setZIndex, noteId, isDrag]);

  const onResizeMouseDown = useCallback(
    (cornerType: ResizeCornerType) => (event: React.MouseEvent<HTMLDivElement>): void => {
      console.log('type', cornerType);
      setInitialMousePosition({
        x: event.pageX,
        y: event.pageY,
      });
      setZIndex(999);
      setIsDrag(true);
    },
    [onResizeMouseMove, onResizeMouseUp],
  );

  const renderCorners = useMemo(
    () =>
      Object.values(ResizeCornerType).map((type) => (
        <div
          key={type}
          className={`resize-corner resize-corner__${type}`}
          onMouseDown={onResizeMouseDown(type)}
        />
      )),
    [onResizeMouseDown],
  );

  useEffect(() => {
    if (isDrag) {
      document.addEventListener('mousemove', onResizeMouseMove);
    }
    return (): void => {
      document.removeEventListener('mousemove', onResizeMouseMove);
    };
  }, [isDrag]);

  useEffect(() => {
    if (isDrag) {
      document.addEventListener('mouseup', onResizeMouseUp);
    }
    return (): void => {
      document.removeEventListener('mouseup', onResizeMouseUp);
    };
  }, [isDrag, size]);

  return (
    <>
      <div
        className="resize"
        style={{
          left: left - 10,
          top: top - 10,
          opacity: isSelected ? 1 : 0,
          width: size.width + 20,
          height: size.height + 30,
          zIndex: resizeZIndex,
        }}
      >
        {renderCorners}
      </div>
      <WrappedComponent
        {...(props as P)}
        ref={forwardRef}
        width={size.width}
        height={size.height}
      />
    </>
  );
};

export default WithResize;
