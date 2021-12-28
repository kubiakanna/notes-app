import * as React from 'react';
import { useRef, useState, useEffect } from 'react';
import { Container, Form, Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Note } from '../models/note.model';

interface IEditNoteProps {
    notes: Note[],
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>
}

const EditNote: React.FC<IEditNoteProps> = ({ notes, setNotes }) => {

    const [note, setNote] = useState<Note>({
        id: '',
        title: '',
        text: '',
        color: '',
        date: '',
        archived: false
    });
    const params = useParams();
    const noteId = params.id;
    const navigate = useNavigate();
    const [error, setError] = useState<string>("");
    const titleRef = useRef<HTMLInputElement | null>(null);
    const textRef = useRef<HTMLTextAreaElement | null>(null);
    const colorRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        fetch(`http://localhost:3111/notes/${noteId}`)
        .then((response) => {
            return response.json();
        }).then(data => {
            console.log(data);
            setNote({
                id: data.id,
                title: data.title,
                text: data.text,
                color: data.color,
                date: (new Date()).toString(),
                archived: data.archived
            });
        }).catch(error => console.log(error));
    }, [noteId]);

    const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch(`http://localhost:3111/notes/${noteId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(note)
        }).then(() => {
            navigate('/home');
        }).catch(error => console.log(error));
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setNote({
            ...note,
            [e.target.name]: e.target.value
        });
    }

  return (
      <div>
        <h2 className="mt-5 ms-3">Edit Your Note</h2>
        <Form className="mt-3 mb-3" onSubmit={(e) => handleEdit(e)}>
            <Container>
                <Row>
                    <Col xs={1}>
                        <Form.Group className="mb-3">   
                            <Form.Label htmlFor="colorInput">
                               <i className="fas fa-palette" />
                            </Form.Label>
                            <Form.Control name="color" type="color" id="colorInput" title="Choose your color" value={ note.color } onChange={ handleChange } ref={ colorRef } />
                        </Form.Group>
                    </Col>
                    <Col xs={4}>
                        <Form.Group className="mb-3" controlId="formBasicTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control name="title" type="text" placeholder="Enter the Title of Your Note" onChange={ handleChange } value={ note.title } ref={ titleRef } />
                        </Form.Group>
                    </Col>
                    <Col xs={7}>
                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>Text</Form.Label>
                            <Form.Control name="text" placeholder="Enter your Note..." as="textarea" rows={10} onChange={ handleChange } value={ note.text } ref={ textRef } />
                        </Form.Group>
                    </Col>
                </Row>
                <Row xs={5} className="d-flex justify-content-center mt-5">    
                <Button type="submit" variant="primary">Update Note</Button>
                </Row>
            </Container>
        </Form>
      </div>
  );
};

export default EditNote;
