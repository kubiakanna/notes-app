import React from 'react';
import Button from 'react-bootstrap/Button';
import '../index.css';

interface IFilterProps {
    currentFilter: string,
    onUpdate: (newFilter: string) => void
}

const Filter: React.FC<IFilterProps> = ({ currentFilter, onUpdate }) => {
    return (
        <nav className="d-flex justify-content-evenly border-top border-bottom border-dark p-3 m-3">
            <Button 
                onClick={() => onUpdate('notes')}
                className={ currentFilter === 'notes' ? 'active btn-filter' : 'btn-filter' }
            >
                Notes
            </Button>
            <Button
                onClick={() => onUpdate('archive')}
                className={ currentFilter === 'archive' ? 'active btn-filter' : 'btn-filter' }
            >
                Archive
            </Button>
        </nav>
    )
}


export default Filter;
