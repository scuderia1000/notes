import React from 'react';
import Button from './Button';
import './styles/AddButton.css'

const AddIcon = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="5" y="11" width="14" height="2" fill="currentColor"/>
  <rect x="13" y="5" width="14" height="2" transform="rotate(90 13 5)" fill="currentColor"/>
</svg>);


interface IProps {
  onClick(): void;
}

const AddButton: React.FC<IProps> = ({ onClick }) => {
  return (
    <div className="button__add">
      <Button onClick={onClick} icon={<AddIcon />}/>
    </div>
  )
}

export default AddButton;
