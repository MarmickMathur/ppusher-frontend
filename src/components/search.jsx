import { useState, useEffect } from "react";
import axios from "axios";

const Search = () => {
  const [input, setInput] = useState("wikipedia ");
  const [result, setresult] = useState([]);

  const onInputChange = (e) => {
    // console.log(e.target.value);
    setInput(e.target.value);
  };

  useEffect(
    /*cannot be an async function*/
    () => {
      const search = async () => {
        const res = await axios.get("https://en.wikipedia.org/w/api.php", {
          params: {
            action: "query",
            list: "search",
            origin: "*",
            format: "json",
            srsearch: input,
          },
        });
        setresult(res.data.query.search);
      };

      if (input !== "" && result.length === 0) {
        // to check if the component is first time rendered
        search();
      } else {
        const timeoutId = setTimeout(() => {
          if (input) {
            search();
          }
        }, 500);

        return /*this is returned as a clean up function*/ () => {
          clearTimeout(timeoutId);
        };
      }
    },
    [input]
    /* three options - an array , nothing, an empty array )*/
  );

  const results = result.map((res, index) => {
    return (
      <div className="item" key={index}>
        <div className="right floated content">
          <a
            className="ui button"
            href={`https://en.wikipedia.org?curid=${res.pageid}`}
          >
            go
          </a>
        </div>
        <div className="content">
          <div className="header">{res.title}</div>
          <span dangerouslySetInnerHTML={{ __html: res.snippet }}></span>
        </div>
      </div>
    );
  });

  return (
    <div>
      <form className="ui form">
        <div className="field">
          <label> enter the search term</label>
          <input className="input" value={input} onChange={onInputChange} />
        </div>
      </form>
      <div className="ui celled list">{results}</div>
    </div>
  );
};

export default Search;
