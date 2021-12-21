import React, { useState } from 'react';
import Header from './components/Header';
import NotesList from './components/NotesList';
import { Note } from './models/note.model'
import { Container, Row, Col } from 'react-bootstrap'
import CreateNotes from './components/CreateNotes';

function App() {
  const [notes, setNotes] = useState<Note[]>([{
    id: (new Date).toString(),
    title: "Add notes",
    text: "Create new notes!",
    color: "#dfdfdf",
    date: (new Date).toString()
  }]);


  return (
    <div>
      <Header />
      <Container className="mt-5">
        <Row>
          <Col>
          <CreateNotes notes={ notes } setNotes={ setNotes }/>
          </Col>
        </Row>
        <Row>
          <Col>
            <NotesList notes={ notes } setNotes={ setNotes }/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;