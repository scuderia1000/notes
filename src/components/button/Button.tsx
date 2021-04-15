import React from 'react';
import './styles/Button.css';

export enum ButtonSize {
  XS = 'XS',
  S = 'S',
  M = 'M',
  L = 'L',
}

interface IProps {
  className?: string;
  size?: ButtonSize;
  onClick?: () => void;
  icon?: JSX.Element;
}

const mainCss = 'button'

const Button: React.FC<IProps> = ({ onClick, icon, className = '', size = ButtonSize.M }) => {
  return (
    <div className={`${mainCss} ${className} ${mainCss}_size-${size}`} onClick={onClick}>
      {icon}
    </div>
  )
}

export default Button;
