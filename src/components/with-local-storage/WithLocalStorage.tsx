import React from 'react';
import { INote } from '../note';

const WithLocalStorage = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  return class extends React.Component<P> {

    private replaceItem = (noteId: string, value: Record<string, any>): void => {
      const storageItem = localStorage.getItem(noteId) ?? '';
      const item = JSON.parse(storageItem);
      const newItem = {
        ...item,
        ...value,
      }
      localStorage.setItem(noteId, JSON.stringify(newItem));
    }

    private updateItemsProp = (notes: Record<string, INote>, propName: string): void => {
      Object.keys(notes).forEach((noteId) => {
        const note = notes[noteId];
        // @ts-ignore
        this.replaceItem(noteId, { [propName]: note[propName] });
      });
    }

    render(): React.ReactNode {
      return (
        <WrappedComponent
          {...(this.props as P)}
          writeToStorage={this.replaceItem}
          updateItemsProp={this.updateItemsProp} />
      )
    }
  }
}

export default WithLocalStorage;
