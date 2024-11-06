/* eslint-disable jsx-a11y/anchor-is-valid */
function Empty({ onOverlay }) {
  return (
    <div className="flex justify-center items-center p-5 w-full bg-red-100 border-2 border-red-400 text-2xl rounded-lg max-521:text-lg max-360:text-sm gap-1">
      <span className="text-center">یادداشتی ثبت نکردید؟ </span>
      <a href="#" className="pr-1 underline text-blue-600" onClick={onOverlay}>
        ثبت یادداشت
      </a>
    </div>
  );
}
export default Empty;
