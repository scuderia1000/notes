import React from 'react';
import { INoteControllerProps } from '../../containers/note-controller';

const WithLocalStorage = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  type WrappedComponentProps = P & INoteControllerProps;

  return class extends React.Component<WrappedComponentProps> {

    private write = (value: Record<string, any>) => {
      const { noteKey } = this.props;
      const itemKey = String(noteKey);
      const storageItem = localStorage.getItem(itemKey) ?? '';
      const item = JSON.parse(storageItem);
      const newItem = {
        ...item,
        ...value,
      }
      localStorage.setItem(itemKey, JSON.stringify(newItem));
    }

    render(): React.ReactNode {
      // const {} = this.props;
      return (
        <WrappedComponent {...(this.props as P)} writeToStorage={this.write} />
      )
    }
  }
}

export default WithLocalStorage;
