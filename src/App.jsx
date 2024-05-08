import { useState } from "react";
import Leftnav from "./components/leftnav";
import Topnav from "./components/topnav";
import Songlist from "./components/songlist";
import Musicplayer from "./components/musicplayer";

function App() {
  const [tags, settags] = useState([]);
  const [song, setsong] = useState({});

  return (
    <>
      <div className="relative">
        <Topnav ontagchange={settags} />
      </div>
      <div className="grid grid-cols-12 gap-0">
        <div className="col-span-3">
          <Leftnav ontagchange={settags} />
        </div>
        <div className="col-span-5">
          <Songlist tags={tags} onsongchange={setsong} />
        </div>
        <div className="col-span-4 flex align-middle">
          <Musicplayer song={song} />
        </div>
      </div>
    </>
  );
}

export default App;
