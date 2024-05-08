import { useState, useEffect } from "react";
import axios from "axios";

const Songlist = ({ tags, onsongchange }) => {
  const [songs, setsongs] = useState([]);

  const search = async (term) => {
    // console.log(1);
    const res = await axios.get("https://en.wikipedia.org/w/api.php", {
      params: {
        action: "query",
        list: "search",
        origin: "*",
        format: "json",
        srsearch: term,
      },
    });

    if (res.data.query) {
      // setsongs(res.data.query.search);
      return res.data.query.search;
    }
    return [];
  };

  const searchtags = async () => {
    // console.log("fures");
    let temp = [];
    for (let i = 0; i < tags.length; i++) {
      const res = await search(tags[i]);
      //   console.log(res);
      res.forEach((song) => {
        temp.push(song);
      });
      // temp.concat(res);
    }
    // console.log("temp is", temp);
    setsongs(temp);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (tags.length) {
        searchtags();
        // search(tags[0]);
      }
    }, 500);

    return /*this is returned as a clean up function*/ () => {
      clearTimeout(timeoutId);
    };
  }, [tags]);

  const songlist = songs.map((song, index) => {
    return (
      <li
        key={index}
        onClick={() => {
          onsongchange(song);
        }}
        className="w-full px-4 py-2 border-b border-gray-200  dark:border-gray-600"
      >
        {song.title}
      </li>
    );
  });

  return (
    <>
      <div className="list">
        <ul className=" font-medium text-gray-900 bg-white border border-gray-200  dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          {songlist}
        </ul>
      </div>
    </>
  );
};

export default Songlist;
