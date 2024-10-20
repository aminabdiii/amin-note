import NoteItem from './NoteItem';
import EditingModal from '../EditingModal';
import { useState, useRef } from 'react';
import swal from 'sweetalert';

function NotesContainer({ className, setNotes, notes, onOverlay }) {
  const [isOpen, setIsOpen] = useState(false);
  const values = useRef({});
  function handleNote(id, work) {
    if (work === 'delete') {
      swal({
        title: 'آیا از حذف این یادداشت اطمینان دارید؟',
        icon: 'warning',
        dangerMode: true,
        buttons: ['خیر', 'بله'],
      }).then((result) => {
        if (result) {
          swal({
            title: 'یادداشت مورد نظر با موفقیت حذف شد',
            icon: 'success',
            buttons: 'خیلی هم عالی',
          }).then(() => {
            const items = JSON.parse(localStorage.getItem('notes'));

            const filteredItems = items.filter((item) => item.id !== id);
            localStorage.setItem('notes', JSON.stringify(filteredItems));

            setNotes((notes) => {
              return notes.filter((note) => note.id !== id);
            });
          });
        }
      });
    } else if (work === 'edit') {
      setIsOpen(true);
      values.current = notes.find((note) => note.id === id);
    } else if (work === 'complete') {
      swal({
        title: 'آیا یادداشت تان را تکمیل کردید؟',
        icon: 'warning',
        dangerMode: true,
        buttons: ['خیر', 'بله'],
      }).then((result) => {
        if (result) {
          setNotes((notes) => {
            const updatedNotes = notes.map((note) => {
              return note.id === id ? { ...note, isComplete: true } : note;
            });

            localStorage.setItem('notes', JSON.stringify(updatedNotes));
            return updatedNotes;
          });
          swal({
            title: 'با موفقیت تکمیل شد',
            icon: 'success',
            buttons: 'خیلی هم عالی',
          });
        }
      });
    }
  }

  return (
    <>
      {isOpen && (
        <EditingModal
          isOpen={isOpen}
          setNotes={setNotes}
          onOverlay={setIsOpen}
          isVisible={isOpen ? 'visible opacity-100' : 'invisible opacity-0'}
          values={values.current}
        />
      )}

      <section className={className}>
        {notes.map((note) => {
          return <NoteItem key={note.id} note={note} handleNote={handleNote} />;
        })}
      </section>
    </>
  );
}
export default NotesContainer;
