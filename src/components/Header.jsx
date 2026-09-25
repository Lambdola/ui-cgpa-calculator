import ui_logo from "../images/ui_logo.jpg";

function Header({ setSideNav }) {
  return (
    <div className="relative">
      <div className="fixed top-0 z-10 w-full h-10 bg-slate-500 blur flex justify-between items-center"></div>
      <div className="fixed z-10 w-full h-10 bg-white flex justify-between items-center">
        <div
          onClick={() => setSideNav(true)}
          className="h-10 w-10 hover:bg-gray-400 flex items-center justify-center "
        >
          <div className="space-y-1">
            <div className="w-5 h-1 bg-black rounded-full"></div>
            <div className="w-3 h-1 bg-black rounded-full"></div>
          </div>
        </div>
        <div
          onClick={() => {
            window.location.reload();
          }}
          className="font-mono font-bold text-base xl:text-2xl cursor-pointer  font-instrument-serif flex items-center gap-1"
        >
          <figure className="h-6 w-6 md:h-8 md:w-8">
            <img src={ui_logo} className="h-full w-full object-contain" />
          </figure>
          <p>UI CGPA Calculator</p>
        </div>
        <div className="h-10 w-10 bg-transparent rounded-full"></div>
      </div>
    </div>
  );
}

export default Header;
