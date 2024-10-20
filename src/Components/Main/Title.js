import swal from 'sweetalert';
import Swal from 'sweetalert2';
import '../../dubdev.css';

function Title({ children, setNotes, onOverlay, notes }) {
  function handleCheckAll() {
    swal({
      title: 'آیا از این کار اطمینان دارید؟',
      icon: 'warning',
      dangerMode: true,
      buttons: ['خیر', 'بله'],
    }).then((result) => {
      if (result) {
        swal({
          title: 'با موفقیت انجام شد',
          icon: 'success',
          buttons: 'خیلی هم عالی',
        }).then(() => {
          setNotes((notes) => {
            const upgradeNotes = notes.map((note) => {
              return { ...note, isComplete: true };
            });

            localStorage.setItem('notes', JSON.stringify(upgradeNotes));
            return upgradeNotes;
          });
        });
      }
    });
  }
  function handleDeleteAll() {
    swal({
      title: 'آیا از این کار اطمینان دارید؟',
      icon: 'warning',
      dangerMode: true,
      buttons: ['خیر', 'بله'],
    }).then((result) => {
      if (result) {
        swal({
          title: 'با موفقیت حذف شد',
          icon: 'success',
          buttons: 'خیلی هم عالی',
        }).then((result) => {
          if (result) {
            setNotes([]);
            localStorage.setItem('notes', JSON.stringify([]));
          }
        });
      }
    });
  }
  function handleAddPost() {
    onOverlay();
  }
  function handleShowModal() {
    Swal.fire({
      confirmButtonText:
        '<a href="https://dubdev.ir" class="swal2-confirm">رفتن به سایت</a>',
      title: 'سلام و درود خدمت دوستان عزیز سایت dubdev.ir',
      text: `
بنده JS رو از دوره جاوا اسکریپت جوناس با دوبله دوستمون آقای مهرشاد چشم خاوری عزیز آموختم. خیلی عالی بود. و با توجه به رضایتی که از نحوه بیان و دوبله مهرشاد جان داشتم, تصمیم گرفتم دوره ری اکت ایشون رو نیز تهیه کنم. هر دو این دوره ها عالی و پروژه محور هستن.
مهرشاد جان, ازت ممنونیم بابت دوبله ها.`,
    }).then((result) => {
      if (result.isConfirmed) window.location.href = 'https://dubdev.ir';
    });
  }

  return (
    <div className="flex items-center justify-between flex-wrap px-1 max-sm:gap-y-5 max-sm:justify-center max-sm:flex-col text-center">
      <h1 className="text-3xl px-4">{children}</h1>
      <div className="flex gap-5 flex-wrap justify-center text-center">
        <button
          onClick={handleShowModal}
          title="اضافه کردن یادداشت جدید"
          className="transition-all duration-300 px-3 py-2 flex items-center rounded-lg bg-violet-500 text-white hover:bg-violet-600 max-sm:px-2 max-sm:py-2 max-sm:text-sm max-xxs:px-1 max-xxs:text-xs h-[48px] max-360:w-[103px] max-360:flex max-360:justify-center">
          <span>dubdev.ir</span>
          <i className="bi bi-graph-up-arrow px-1 text-xl"></i>
        </button>
        <button
          title="اضافه کردن یادداشت جدید"
          onClick={handleAddPost}
          className="transition-all duration-300 px-3 py-2 flex items-center rounded-lg bg-emerald-400 text-white hover:bg-emerald-500 max-sm:px-2 max-sm:py-2 max-sm:text-sm max-xxs:px-1 max-xxs:text-xs h-[48px] max-360:w-[103px] max-360:flex max-360:justify-center">
          <span>ثبت یادداشت</span>
          <i className="bi bi-plus-circle-dotted px-1 text-xl"></i>
        </button>

        {notes.length ? (
          <>
            <button
              title="در صورت تکمیل برنامه روزانه, کلیک کنید"
              onClick={handleCheckAll}
              className="transition-all duration-300 px-3 py-2 flex items-center rounded-lg bg-blue-400 text-white hover:bg-blue-500 max-sm:px-2 max-sm:py-2 max-sm:text-sm max-xxs:px-1 max-xxs:text-xs h-[48px] max-360:w-[103px] max-360:flex max-360:justify-center">
              <span>تکمیل همه</span>
              <i className="bi bi-check-all text-xl pt-1"></i>
            </button>
            <button
              title="پاک کردن کلیه یادداشت ها"
              onClick={handleDeleteAll}
              className="transition-all duration-300 px-3 py-2 flex items-center rounded-lg bg-red-600 text-white hover:bg-red-500 max-sm:px-2 max-sm:py-2 max-sm:text-sm max-xxs:px-1 max-xxs:text-xs h-[48px] max-360:flex max-360:justify-center">
              پاک کردن همه
              <i className="bi bi-trash3-fill px-1"></i>
            </button>
          </>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
export default Title;