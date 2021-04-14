import React from 'react';
import { INoteControllerProps } from '../../containers/note-controller';

const WithLocalStorage = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  type WrappedComponentProps = P & INoteControllerProps;

  return class extends React.Component<WrappedComponentProps> {

    private replaceItem = (value: Record<string, any>): void => {
      const { noteId } = this.props;
      const storageItem = localStorage.getItem(noteId) ?? '';
      const item = JSON.parse(storageItem);
      const newItem = {
        ...item,
        ...value,
      }
      localStorage.removeItem(noteId);
      localStorage.setItem(noteId, JSON.stringify(newItem));
    }

    render(): React.ReactNode {
      // const {} = this.props;
      return (
        <WrappedComponent {...(this.props as P)} writeToStorage={this.replaceItem} />
      )
    }
  }
}

export default WithLocalStorage;
