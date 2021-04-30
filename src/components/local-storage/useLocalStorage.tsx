import { INote } from '../note';

export interface StorageProps {
  storageReplaceItem(noteId: string, value: Record<string, INote[keyof INote]>): void;
  storageUpdateItemsProp(notes: Record<string, INote>, propName: keyof INote): void;
  storageSaveItem(itemId: string, item: INote): void;
  storageDeleteItem(itemId: string): void;
  storageGetAll(): Record<string, INote>;
  storageClearAll(): void;
}

export default function useLocalStorage(): StorageProps {
  const storageReplaceItem = (noteId: string, value: Record<string, INote[keyof INote]>): void => {
    const storageItem = localStorage.getItem(noteId) ?? '';
    const item = JSON.parse(storageItem);
    const newItem = {
      ...item,
      ...value,
    };
    localStorage.setItem(noteId, JSON.stringify(newItem));
  };

  const storageUpdateItemsProp = (notes: Record<string, INote>, propName: keyof INote): void => {
    Object.keys(notes).forEach((noteId) => {
      const note = notes[noteId];
      storageReplaceItem(noteId, { [propName]: note[propName] });
    });
  };

  const storageSaveItem = (itemId: string, item: INote): void => {
    localStorage.setItem(itemId, JSON.stringify(item));
  };

  const storageDeleteItem = (itemId: string): void => {
    localStorage.removeItem(itemId);
  };

  const storageGetAll = (): Record<string, INote> =>
    Object.keys(localStorage).reduce(
      (acc, key) => ({ ...acc, [key]: JSON.parse(localStorage[key]) }),
      {},
    );

  const storageClearAll = (): void => localStorage.clear();

  return {
    storageReplaceItem,
    storageUpdateItemsProp,
    storageSaveItem,
    storageDeleteItem,
    storageGetAll,
    storageClearAll,
  };
}
