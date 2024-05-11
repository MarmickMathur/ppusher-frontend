import { useState } from "react";
import Modal from "./modal";

const Listitem = ({ song, action1 }) => {
  const [vis, setvis] = useState(false);
  // console.log(index);

  return (
    <>
      <li
        // onClick={() => {
        //   action1(song);
        // }}
        className="w-full flex px-4 py-2 border-b border-gray-200  dark:border-gray-600"
      >
        <div className=" w-10/12">{song}</div>
        <div className=" w-1/12">
          <button
            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => {
              setvis(!vis);
            }}
            type="button"
          >
            {"+"}
          </button>
          <Modal vis={vis} setvis={setvis} />
        </div>

        <div
          onClick={() => {
            action1(song);
          }}
          className=" w-1/12"
        >
          {">"}
        </div>
      </li>
    </>
  );
};

export default Listitem;
