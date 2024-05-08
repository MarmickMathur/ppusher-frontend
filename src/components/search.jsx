import { useState, useEffect } from "react";

const Search = ({ ontagchange }) => {
  const [input, setInput] = useState("lover boy");

  const onInputChange = (e) => {
    // console.log(e.target.value);
    setInput(e.target.value);
  };

  useEffect(
    /*cannot be an async function*/
    () => {
      const search = () => {
        let newarr = input.split(", ");
        ontagchange(newarr);
      };

      if (input !== "") {
        // to check if the component is first time rendered
        search();
      }
    },
    [input]
    /* three options - an array , nothing, an empty array )*/
  );

  return (
    <div>
      <form className="ui form">
        <div className="field">
          <label> enter the search term</label>
          <input className="input" value={input} onChange={onInputChange} />
        </div>
      </form>
    </div>
  );
};

export default Search;
