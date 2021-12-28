import * as React from 'react';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Note } from '../models/note.model';
import { Link } from 'react-router-dom';

interface INotesProps {
    note: Note,
    handleDelete: (id: string) => void,
    handleArchive: (id: string) => void
}

const Notes: React.FC<INotesProps> = ({note, handleDelete, handleArchive }) => {

  const onDelete = () => {
    fetch(`http://localhost:3111/notes/${note.id}`, {
      method: 'DELETE'
    }).then(() => {
      handleDelete(note.id);
    }).catch((error) => console.log(error));
  };

  const onArchive = () => {
    fetch(`http://localhost:3111/notes/${note.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ archived: !note.archived })
    }).then(() => {
      handleArchive(note.id);
    }).catch((error) => console.log(error));
  }

  const classesBg = { "backgroundColor": note.color } as React.CSSProperties;
  let delBtn = "danger";
  let editBtn = "btn btn-primary mt-3 ms-3";
  let archBtn = "warning";
  let archBtnText = "Archive";
  if(note.archived) {
    classesBg["backgroundColor"] = "transparent";
    delBtn = "secondary";
    editBtn = "btn btn-secondary mt-3 ms-3";
    archBtn = "secondary";
    archBtnText = "Unarchive";
  }

  return (
      <div className="mb-3">
          <Card style={classesBg}>
              <Card.Body>
                <Card.Title>{note.title}</Card.Title>
                <Card.Text>{note.text}</Card.Text>
                <Card.Subtitle className="text-muted">{note.date}</Card.Subtitle>
                <Button 
                  className="mt-3"
                  variant={delBtn}
                  onClick={ onDelete }
                  >
                    Delete
                </Button>
                <Link 
                  className={ editBtn }
                  role="button"
                  to={`/notes/${note.id}/edit`}
                  > 
                  Edit
                  </Link>
                <Button
                  className="mt-3 ms-3"
                  variant={archBtn}
                  onClick={ onArchive }
                  >
                    {archBtnText}
                </Button>
              </Card.Body>
          </Card>
      </div>
  );
};

export default Notes;
