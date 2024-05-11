import { useState, useEffect } from "react";
import axios from "axios";

const Search = ({ setterm }) => {
  const [input, setInput] = useState("lover boy");
  const [rec, setrec] = useState([]);

  const onInputChange = (e) => {
    // console.log(e.target.value);
    setInput(e.target.value);
  };

  useEffect(
    /*cannot be an async function*/
    () => {
      const search = async () => {
        let temp = [];
        const { data } = await axios.get(
          `https://ppushermusicsuggestion.onrender.com//autocomplete?query=${input}`
        );
        console.log(data);
        for (let i = 0; i < Math.min(10, data.length); i++) {
          temp.push(data[i]);
        }
        setrec(temp);
      };
      if (input !== "") {
        // to check if the component is first time rendered
        search();
      }
    },
    [input]
    /* three options - an array , nothing, an empty array )*/
  );
  let recs = [];
  recs = rec.map((item, index) => {
    return (
      <input
        key={index}
        className="input p-2  rounded-b-md w-1/2 border-2 border-black"
        value={item}
        onClick={() => {
          // console.log(item);
          setterm(item);
          setrec([]);
          setInput("");
        }}
      />
    );
  });

  return (
    <div className=" w-9/12">
      <form className="ui form">
        <div>
          <label className="pr-10"> enter the search term</label>
          <input
            className="input p-2  rounded-t-md w-1/2 border-2 border-black"
            value={input}
            onChange={onInputChange}
          />
          <ul className="absolute">{recs}</ul>
        </div>
      </form>
    </div>
  );
};

export default Search;
