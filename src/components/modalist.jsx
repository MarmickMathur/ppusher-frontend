import { useState, useEffect } from "react";
import axios from "axios";

const pl = [
  { name: "new playlist" },
  { name: "new playlist" },
  { name: "new playlist" },
];

const Modalist = ({ song }) => {
  const [playlist, setplaylist] = useState(pl);
  const [opts, setopts] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const getres = async () => {
    const res = await axios.get("");
    setplaylist(res);
  };
  const addres = async () => {
    const res = await axios.post("apislink/playlist"); //using input value
  };

  useEffect(() => {
    getres();
  }, []);

  useEffect(() => {
    let temp = playlist;
    setopts(temp);
  }, [playlist]);

  const addnewplaylist = async () => {
    await addres();
    await getres();
  };

  const Listitems = opts.map((op, index) => {
    return (
      <li key={index}>
        <div className="w-11/12">{op.name}</div>
        <div className="w-1/12">+</div>
      </li>
    );
  });

  return (
    <>
      <div className="list">
        <ul className=" font-medium text-gray-900 bg-white border border-gray-200  dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          {Listitems}
          <li>
            <div className="w-11/12">
              <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                placeholder="Enter text here"
              />{" "}
            </div>
          </li>
        </ul>
        <button onClick={addnewplaylist}>add new playlist</button>
      </div>
    </>
  );
};

export default Modalist;
