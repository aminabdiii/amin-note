export default function Header({ onOverlay }) {
  return (
    <header className="bg-[#222222]">
      <nav className="flex justify-between items-center text-white font-bold">
        <ul className="flex gap-x-3">
          <li className="max-410:text-sm max-360:text-[14px]">
            <button
              className="p-3 block"
              onClick={onOverlay}
              title="اضافه کردن یادداشت جدید">
              یادداشت جدید
            </button>
          </li>
          <li className="max-410:text-sm max-360:text-[14px]">
            <a
              href="https://t.me/AminAP9"
              className="p-3 block"
              title="AminAP9@">
              تلگرام من
            </a>
          </li>
        </ul>
        <h2 className="p-3 text-2xl cursor-pointer max-410:text-lg max-360:text-sm">
          📓AMiN Note
        </h2>
      </nav>
    </header>
  );
}
