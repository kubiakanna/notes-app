import { Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import EditNote from './pages/EditNote';
import { useState } from 'react';
import { Note } from './models/note.model'

function App() {

  const [notes, setNotes] = useState<Note[]>([]);

  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/notes/:id/edit" element={<EditNote notes={[]} setNotes={setNotes} />} />
      </Routes>
    </div>
  );
}

export default App;