import { useState, useEffect } from "react";
import axios from "axios";
import Listitem from "./listcomp";

const Songlist = ({ tags, term, onsongchange }) => {
  const [songs, setsongs] = useState([]);

  const searchterm = async () => {
    console.log(1);
    if (term != "") {
      const { data } = await axios.post(
        `https://ppushermusicsuggestion.onrender.com/recommend`,
        {
          music_title: term,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setsongs(data.recommendations);
    }
  };

  const searchtags = async () => {
    if (tags.length != 0) {
      let temp = [];
      for (let i = 0; i < tags.length; i++) {
        const { data } = await axios.get(
          `https://ppushermusicsuggestion.onrender.com//autocomplete?query=${tags[i]}`
        );
        console.log(data);

        if (data.length != 0) {
          const res = await axios.post(
            `https://ppushermusicsuggestion.onrender.com/recommend`,
            {
              music_title: data[0],
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          res.recommendations.forEach((song) => {
            temp.push(song);
          });
        }

        //   console.log(res);
        // temp.concat(res);
      }
      // console.log("temp is", temp);
      setsongs(temp);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (term != "") {
        searchterm();
        // search(tags[0]);
      }
    }, 500);

    return /*this is returned as a clean up function*/ () => {
      clearTimeout(timeoutId);
    };
  }, [term]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (tags.length != 0) {
        searchtags();
        // search(tags[0]);
      }
    }, 500);

    return /*this is returned as a clean up function*/ () => {
      clearTimeout(timeoutId);
    };
  }, [tags]);

  console.log(songs);
  const songlist = songs.map((song, index) => {
    return (
      <Listitem action1={onsongchange} index={index} key={index} song={song} />
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
