function Overlay({ isVisible, onCloseModal }) {
  return (
    <div
      onClick={onCloseModal}
      className={`transition-all duration-300 fixed top-0 left-0 w-full h-screen bg-black/40 z-50 ${isVisible}`}></div>
  );
}
export default Overlay;
