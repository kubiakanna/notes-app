import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Note } from '../models/note.model';
import Header from '../components/Header';
import NotesList from '../components/NotesList';
import CreateNotes from '../components/CreateNotes';
import Filter from '../components/Filter';

const HomePage = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [currentFilter, setCurrentFilter] = useState('notes');

    const updateFilter = (newFilter: string) => {
        setCurrentFilter(newFilter);
    }

    useEffect(() => {
        async function fetchNotes() {
          try {
            const response = await fetch("http://localhost:3111/notes");
            const fetchedNotes = await response.json();
            setNotes(fetchedNotes);
          } catch (error) {
            console.log(error);
          }
        }
        fetchNotes();
      }, []);

    const handleDelete = (id: string) => {
        setNotes(notes.filter(note => note.id !== id));
     }

    const toggleArchive = (id: string) => {
        const clonedNotes = [...notes];
        const clickedIndex = clonedNotes.findIndex(note => note.id === id);
        const clickedNote = clonedNotes[clickedIndex];
        clickedNote.archived = !clickedNote.archived;
        setNotes(clonedNotes);
    }

    let tsx = (
        <NotesList
            header=''
            notes={ notes }
            handleDelete={ handleDelete }
            handleArchive={ toggleArchive }
        />
    );

    if(currentFilter === 'archive') {
        tsx =
            <NotesList
                header="Archive"
                notes={ notes.filter(notes => notes.archived) }
                handleDelete={ handleDelete }
                handleArchive={ toggleArchive }
            />
    } else if(currentFilter === 'notes') {
        tsx =
            <NotesList
                header="Notes"
                notes={ notes.filter(notes => !notes.archived) }
                handleDelete={ handleDelete }
                handleArchive={ toggleArchive }
            />
    }

      return (
        <div>
        <Header />
        <Container className="mt-5">
          <Row>
            <Col>
            <CreateNotes notes={ notes } setNotes={ setNotes } />
            </Col>
          </Row>
          <Row>
            <Col>
              <Filter currentFilter={ currentFilter } onUpdate={ updateFilter } />
            </Col>
          </Row>
          <Row>
            <Col>
              {tsx}
            </Col>
          </Row>
        </Container>
      </div>
      );
    };
export default HomePage;
