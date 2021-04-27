import React from 'react';
import { INote } from '../note';

const WithLocalStorage = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
): typeof React.Component => {
  // eslint-disable-next-line react/display-name
  return class extends React.Component<P> {
    private replaceItem = (noteId: string, value: Record<string, INote[keyof INote]>): void => {
      const storageItem = localStorage.getItem(noteId) ?? '';
      const item = JSON.parse(storageItem);
      const newItem = {
        ...item,
        ...value,
      };
      localStorage.setItem(noteId, JSON.stringify(newItem));
    };

    private updateItemsProp = (notes: Record<string, INote>, propName: keyof INote): void => {
      Object.keys(notes).forEach((noteId) => {
        const note = notes[noteId];
        this.replaceItem(noteId, { [propName]: note[propName] });
      });
    };

    private saveItem = (itemId: string, item: INote): void => {
      localStorage.setItem(itemId, JSON.stringify(item));
    };

    private deleteItem = (itemId: string): void => {
      localStorage.removeItem(itemId);
    };

    render(): React.ReactNode {
      return (
        <WrappedComponent
          {...(this.props as P)}
          storageReplaceItem={this.replaceItem}
          storageSaveItem={this.saveItem}
          storageDeleteItem={this.deleteItem}
          storageUpdateItemsProp={this.updateItemsProp}
        />
      );
    }
  };
};

export default WithLocalStorage;
