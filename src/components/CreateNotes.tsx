import * as React from 'react';
import { useRef, useState } from 'react';
import { Alert, Container, Form, Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Note } from '../models/note.model';

interface ICreateNotesProps {
    notes: Note[],
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>
}

const CreateNotes: React.FunctionComponent<ICreateNotesProps> = ({ notes, setNotes }) => {
    const [error, setError] = useState<string>("");
    const titleRef = useRef<HTMLInputElement | null>(null);
    const textRef = useRef<HTMLTextAreaElement | null>(null);
    const colorRef = useRef<HTMLInputElement | null>(null);

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if(titleRef.current?.value === "" || textRef.current?.value === "") {
            return setError("Are you sure an empty note is what you want?");
        }

        setError("");
        setNotes([...notes, {
            id: (new Date()).toString(),
            title: (titleRef.current as HTMLInputElement).value,
            text: (textRef.current as HTMLTextAreaElement).value,
            color: (colorRef.current as HTMLInputElement).value,
            date: (new Date()).toString()
        }]);

        (titleRef.current as HTMLInputElement).value = "";
        (textRef.current as HTMLTextAreaElement).value = "";
        (colorRef.current as HTMLInputElement).value = "#dfdfdf";
    }
  return (
      <div>
        <h2 className="mt-5">Create a Note</h2>
        { error && <Alert variant="danger">{ error }</Alert>}
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
                    <Col xs={3}>
                        <Form.Group className="mb-3" controlId="formBasicTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter the Title of Your Note" ref={ titleRef } />
                        </Form.Group>
                    </Col>
                    <Col xs={8}>
                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>Text</Form.Label>
                            <Form.Control placeholder="Enter your Note..." as="textarea" ref={ textRef } />
                        </Form.Group>
                    </Col>
                </Row>
                <Row xs={5}>    
                <Button type="submit" variant="primary">Add Note</Button>
                </Row>
            </Container>
        </Form>
      </div>
  );
};

export default CreateNotes;
