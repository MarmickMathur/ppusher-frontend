import DropDown from "./dropdown";
import { useState } from "react";

const options = [
  { label: "the color red", value: "Red" },
  { label: "the color blue", value: "Blue" },
  { label: "the color green", value: "Green" },
];

const Leftnav = () => {
  const [libop, setlibop] = useState([]);
  const [playlist, setplaylist] = useState([]);

  return (
    <>
      <aside
        id="default-sidebar"
        className="z-40 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidenav"
      >
        <div className="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <ul className="space-y-2">
            <li>
              <DropDown
                key={"mylib"}
                options={options}
                selected={libop}
                label={"mylib"}
                onSelectedChange={setlibop}
              />
            </li>
            <li>
              <DropDown
                key={"playlists"}
                options={options}
                selected={playlist}
                label={"playlist"}
                onSelectedChange={setplaylist}
              />
            </li>
            <li>
              <DropDown
                key={"artist"}
                options={options}
                selected={playlist}
                label={"artist"}
                onSelectedChange={setplaylist}
              />
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Leftnav;
