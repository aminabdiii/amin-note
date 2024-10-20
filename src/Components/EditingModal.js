import { useState } from 'react';
import Overlay from './Overlay';
import swal from 'sweetalert';

function EditingModal({ isVisible, onOverlay, setNotes, isOpen, values }) {
  const [title, setTitle] = useState(values?.title);
  const [description, setDescription] = useState(values?.description);
  const [isTitleEmpty, setIsTitleEmpty] = useState(true);
  const [isDescriptionEmpty, setIsDescriptionEmpty] = useState(true);

  function handleCloseModal() {
    onOverlay(false);
  }

  function handleEditNote() {
    if (!title.trim() || !description.trim()) {
      if (!title.trim() && !description.trim()) {
        setIsTitleEmpty(false);
        setIsDescriptionEmpty(false);
        return;
      } else if (!title.trim()) {
        setIsTitleEmpty(false);
        return;
      } else if (!description.trim()) {
        setIsDescriptionEmpty(false);
        return;
      }
    }
    if (!values.title) return;

    const editedNote = {
      title,
      description,
      isComplete: false,
      id: values.id,
    };
    setNotes((notes) => {
      const upgradeNote = notes.map((note) =>
        note.id === values.id ? editedNote : note
      );
      localStorage.setItem('notes', JSON.stringify(upgradeNote));
      return upgradeNote;
    });

    swal({
      title: 'ویرایش با موفقیت انجام شد',
      icon: 'success',
      buttons: 'حله',
    }).then(() => handleCloseModal());
  }

  return (
    <>
      <Overlay
        isVisible={isOpen ? 'visible opacity-100' : 'invisible opacity-0'}
        onCloseModal={handleCloseModal}
      />
      <div
        action="submit"
        className={`transition-all duration-300 fixed mx-auto top-24 max-w-lg -inset-x-1/2 z-[999] bg-white w-full px-10 pb-9 rounded-lg ${isVisible} flex flex-col gap-y-6 max-550:scale-[.85] max-550:top-9`}>
        <div className="font-bold text-center text-2xl py-7 border-b-4 border-b-blue-600">
          <h3>ویرایش یادداشت</h3>
        </div>

        <div className="flex flex-col gap-y-5">
          <div className="font-bold text-xl relative">
            <span className="pr-4 max-460:text-lg max-355:text-xs">
              عنوان یادداشت خود را وارد نمایید
            </span>
            <span className="absolute w-2 h-6 top-0 right-0 bg-blue-600"></span>
          </div>

          <div className="w-full flex flex-col">
            <input
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                setIsTitleEmpty(true);
              }}
              className={`border border-gray-200 transition-all rounded-md text-lg p-2 outline-none ${
                isTitleEmpty ? 'ring-blue-600' : 'ring-red-600 ring-2'
              } focus:ring-2 max-460:text-lg max-vxs:text-base w-full`}
              type="text"
              placeholder="عنوان یادداشت تان را وارد نمایید"
            />
            {!isTitleEmpty && (
              <span className="text-red-500 font-bold">
                اوه! ی فیلد خالی مانده!
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-y-5">
          <div className="font-bold text-xl relative">
            <span className="pr-4 max-460:text-lg max-355:text-xs">
              توضیحات یادداشت خود را وارد نمایید
            </span>
            <span className="absolute w-2 h-6 top-0 right-0 bg-blue-600"></span>
          </div>
          <div className="flex flex-col w-full">
            <textarea
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
                setIsDescriptionEmpty(true);
              }}
              placeholder="توضیحات یادداشت تان را وارد نمایید"
              rows={6}
              className={`border border-gray-200 transition-all rounded-md text-lg p-2 outline-none ${
                isDescriptionEmpty ? 'ring-blue-600' : 'ring-red-600 ring-2'
              } focus:ring-2 resize-none max-460:text-lg max-vxs:text-base w-full`}></textarea>
            {!isDescriptionEmpty && (
              <span className="text-red-500 font-bold">
                اوه! ی فیلد خالی مانده!
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-x-5">
          <button
            onClick={() => {
              handleCloseModal();
            }}
            className="w-24 py-2.5 bg-red-400 rounded-lg font-bold text-white">
            انصراف
          </button>
          <button
            className="w-24 py-2.5 bg-emerald-400 rounded-lg font-bold text-white"
            name="submit"
            onClick={handleEditNote}>
            ثبت
          </button>
        </div>
      </div>
    </>
  );
}
export default EditingModal;
