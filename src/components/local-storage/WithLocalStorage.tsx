import React from 'react';
import useLocalStorage from './useLocalStorage';

const WithLocalStorage = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  // eslint-disable-next-line react/display-name
): React.FC<P> => (props): JSX.Element => {
  const {
    storageReplaceItem,
    storageSaveItem,
    storageDeleteItem,
    storageUpdateItemsProp,
  } = useLocalStorage();

  return (
    <WrappedComponent
      {...(props as P)}
      storageReplaceItem={storageReplaceItem}
      storageSaveItem={storageSaveItem}
      storageDeleteItem={storageDeleteItem}
      storageUpdateItemsProp={storageUpdateItemsProp}
    />
  );
};

export default WithLocalStorage;
