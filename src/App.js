import { useState } from 'react';

import Header from './Components/Header/Header';

import Main from './Components/Main/Main';
import Title from './Components/Main/Title';
import NotesContainer from './Components/Main/NotesContainer';
import NewNoteModal from './Components/NewNoteModal';
import Empty from './Components/Main/Empty';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState(function () {
    const notesInStorage = localStorage.getItem('notes');
    return notesInStorage ? JSON.parse(notesInStorage) : [];
  });

  function handleOverlay() {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <div className="relative font-[iranSans] z-10">
      <Header onOverlay={handleOverlay} />
      <Main className="max-w-7xl mx-auto mt-10 flex flex-col gap-y-10 px-3">
        <Title onOverlay={handleOverlay} setNotes={setNotes} notes={notes}>
          یادداشت ها
        </Title>
        {notes.length ? (
          <NotesContainer
            className="grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-550:grid-cols-1 px-6 mb-20"
            setNotes={setNotes}
            notes={notes}
            onOverlay={handleOverlay}
          />
        ) : (
          <Empty onOverlay={handleOverlay} />
        )}
      </Main>

      <NewNoteModal
        isOpen={isOpen}
        setNotes={setNotes}
        onOverlay={handleOverlay}
        isVisible={isOpen ? 'visible opacity-100' : 'invisible opacity-0'}>
        ایجاد یادداشت جدید
      </NewNoteModal>
    </div>
  );
}

export default App;
