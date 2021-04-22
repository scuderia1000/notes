import React, { useCallback } from 'react';

type IProps = {};

const WithResize = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
): React.FC<P & IProps> => (props: IProps): JSX.Element => {
  const handleShowResize = useCallback((event) => {}, []);

  return (
    <div className="with-resize" onClick={handleShowResize}>
      <WrappedComponent {...(props as P)} />
    </div>
  );
};

export default WithResize;
