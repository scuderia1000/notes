import React, { useCallback } from 'react';

type IProps = {};

const WithResize = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  // eslint-disable-next-line react/display-name
): React.FC<P & IProps> => (props: IProps): JSX.Element => {
  const handleShowResize = useCallback((event) => {}, []);

  return (
    <div className="with-resize" onClick={handleShowResize}>
      <WrappedComponent {...(props as P)} />
    </div>
  );
};

export default WithResize;
