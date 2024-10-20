import { useState } from 'react';

function NoteItem({ note, handleNote }) {
  const [moreTitle, setMoreTitle] = useState(false);
  const [moreDescription, setMoreDescription] = useState(false);

  return (
    <div className="border shadow flex flex-col justify-between rounded-lg">
      <div>
        <div className="font-semibold text-lg py-2 border-b px-2 flex justify-between">
          <h3 className="w-8/12 text-[17px] max-sm:text-sm text-justify">
            {note.title.split(' ').length > 6 ? (
              <>
                <span>
                  {note.title
                    .split(' ')
                    .slice(0, moreTitle ? note.title.length : 6)
                    .join(' ')}
                </span>{' '}
                <span
                  className={`cursor-pointer text-xl pt-2 translate-y-10 ${
                    moreTitle ? 'text-red-500' : 'text-emerald-500'
                  } max-sm:text-sm`}
                  onClick={() => setMoreTitle((moreTitle) => !moreTitle)}>
                  ...
                </span>
              </>
            ) : (
              <span className="break-words">
                {note.title.length > 20 ? (
                  <>
                    {note.title.slice(0, moreTitle ? note.title.length : 20)}
                    <span
                      onClick={() => setMoreTitle((isOpen) => !isOpen)}
                      className={`cursor-pointer text-xl pt-2 translate-y-10 ${
                        moreTitle ? 'text-red-500' : 'text-emerald-500'
                      } max-sm:text-sm`}>
                      {' ...'}
                    </span>
                  </>
                ) : (
                  note.title
                )}
              </span>
            )}
          </h3>
          {note.isComplete ? (
            <div className="text-emerald-400 flex items-center gap-x-1 text-sm max-sm:text-[11.7px]">
              <span>تکمیل شد</span>
              <i className="bi bi-check-all pt-1"></i>
            </div>
          ) : (
            <div className="text-yellow-400 flex items-center gap-x-1 text-sm max-sm:text-[11.7px]">
              <span>تکمیل نشده</span>
              <i className="bi bi-alarm"></i>
            </div>
          )}
        </div>
        <div className="w-full">
          <p className="py-4 px-2 min-h-40 w-fulls break-words max-sm:text-xs max-sm:leading-[21px] text-justify">
            {note.description.split(' ').length > 40 ? (
              <>
                {note.description
                  .split(' ')
                  .slice(
                    0,
                    moreDescription ? note.description.split(' ').length : 54
                  )
                  .join(' ')}
                <span
                  onClick={() => setMoreDescription((isOpen) => !isOpen)}
                  className={`cursor-pointer text-xl pt-2 translate-y-10 ${
                    moreDescription ? 'text-red-500' : 'text-emerald-500'
                  } max-sm:text-sm`}>
                  {' ...'}
                </span>
              </>
            ) : (
              <>
                {note.description.slice(
                  0,
                  moreDescription ? note.description.length : 220
                )}
                {note.description.length > 220 && (
                  <span
                    onClick={() => setMoreDescription((isOpen) => !isOpen)}
                    className={`cursor-pointer text-xl pt-2 translate-y-10 ${
                      moreDescription ? 'text-red-500' : 'text-emerald-500'
                    } max-sm:text-sm`}>
                    {' ...'}
                  </span>
                )}
              </>
            )}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 text-white border-t">
        <button
          className="border-x p-2 transition-all text-red-400 hover:bg-red-400 hover:text-white"
          onClick={() => {
            handleNote(note.id, 'delete');
            setMoreTitle(false);
            setMoreDescription(false);
          }}>
          حذف
        </button>
        <button
          onClick={() => {
            handleNote(note.id, 'edit');
          }}
          className="border-x p-2 transition-all text-yellow-400 hover:bg-yellow-400 hover:text-white">
          ویرایش
        </button>
        <button
          onClick={() =>
            note.isComplete ? '' : handleNote(note.id, 'complete')
          }
          className={`col-span-2 border-t p-2 transition-all text-blue-400 ${
            note.isComplete
              ? 'cursor-not-allowed hover:bg-gray-300 hover:text-white'
              : 'hover:bg-blue-400 hover:text-white '
          }`}>
          {note.isComplete ? 'تکمیل شده' : 'انجام شد'}
        </button>
      </div>
    </div>
  );
}
export default NoteItem;
