import React from 'react';
import './styles/Button.css'

interface IProps {
  onClick(): void;
  icon?: JSX.Element;
}

const Button: React.FC<IProps> = ({ onClick, icon }) => {
  return (
    <div className="button" onClick={onClick}>
      {icon}
    </div>
  )
}

export default Button;
