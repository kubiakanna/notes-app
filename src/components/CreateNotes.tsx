import * as React from 'react';
import { useRef, useState } from 'react';
import { Container, Form, Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Note } from '../models/note.model';

interface ICreateNotesProps {
    notes: Note[],
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>
}

const CreateNotes: React.FC<ICreateNotesProps> = ({ notes, setNotes }) => {

    const [note, setNote] = useState<Note>({
        id: '',
        title: '',
        text: '',
        color: '',
        date: '',
        archived: false
    });
    const titleRef = useRef<HTMLInputElement | null>(null);
    const textRef = useRef<HTMLTextAreaElement | null>(null);
    const colorRef = useRef<HTMLInputElement | null>(null);

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        const newNote: Note = {
            id: (new Date).toString(),
            title: note.title,
            text: note.text,
            color: (colorRef.current as HTMLInputElement).value,
            date: (new Date()).toString(),
            archived: false,
        }
        fetch('http://localhost:3111/notes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newNote)
        }).then(() => {
            (colorRef.current as HTMLInputElement).value = "#dfdfdf";
            note.title = "";
            note.text = "";
            setNotes([...notes, newNote]);
        }).catch(error => console.log(error));
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setNote({
            ...note,
            [e.target.name]: e.target.value
        })
    }

  return (
      <div>
        <h2 className="mt-5">Create a Note</h2>
        <Form className="mt-3 mb-3" onSubmit={(e) => handleSubmit(e)}>
            <Container>
                <Row>
                    <Col xs={1}>
                        <Form.Group className="mb-3">   
                            <Form.Label htmlFor="colorInput">
                               <i className="fas fa-palette" />
                            </Form.Label>
                            <Form.Control type="color" id="colorInput" defaultValue="#dfdfdf" title="Choose your color" ref={ colorRef } />
                        </Form.Group>
                    </Col>
                    <Col xs={4}>
                        <Form.Group className="mb-3" controlId="formBasicTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control name="title" type="text" placeholder="Enter the Title of Your Note" onChange={ handleChange } value={ note.title } ref={ titleRef } required/>
                        </Form.Group>
                    </Col>
                    <Col xs={7}>
                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>Text</Form.Label>
                            <Form.Control name="text" placeholder="Enter your Note..." as="textarea" rows={7} onChange={ handleChange } value={ note.text } ref={ textRef } required/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row xs={5} className="d-flex justify-content-center">    
                <Button type="submit" variant="primary">Add Note</Button>
                </Row>
            </Container>
        </Form>
      </div>
  );
};

export default CreateNotes;
