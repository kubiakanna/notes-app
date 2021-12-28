import * as React from 'react';
import { Note } from '../models/note.model';
import Notes from './Notes';

interface INotesListProps {
    header: string,
    notes: Note[],
    handleDelete: (id: string) => void,
    handleArchive: (id: string) => void
}

const NotesList: React.FC<INotesListProps> = ({ header, notes, handleDelete, handleArchive }) => {
    
    const renderNotes = ():JSX.Element[] | string => {
        if(notes.length === 0) return 'Nothing here!';
        return notes.map(note => {
            return <Notes key={ note.id } note={ note } handleDelete={ handleDelete } handleArchive={ handleArchive } />
        })
    }
  return (
      <div>
        <h2 className="mt-3">{ header }</h2>
        <div>{ renderNotes() }</div>
      </div>
  );
};

export default NotesList;
