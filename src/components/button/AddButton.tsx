import React from 'react';
import Button from './Button';
import './styles/AddButton.css'
import { AddIcon } from '../icon';

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
