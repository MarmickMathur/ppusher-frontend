import Search from "./search";
import Authbutton from "./Login";
import Addsong from "./songAdd";

const Topnav = ({ setterm }) => {
  return (
    <>
      <nav className="bg-white dark:bg-gray-900  w-full z-20 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Search setterm={setterm} />
          <div className="bg-blue-900 text-white rounded-md p-3">
            <Authbutton />
          </div>
          <div className="bg-blue-900 text-white rounded-md p-3">
            <Addsong />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Topnav;
