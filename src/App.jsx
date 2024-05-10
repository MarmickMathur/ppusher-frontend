import { useEffect, useState } from "react";
import Leftnav from "./components/leftnav";
import Topnav from "./components/topnav";
import Songlist from "./components/songlist";
import Musicsplitter from "./components/musicsplitter";
import Authbutton from "./components/Login";

function App() {
  const [tags, settags] = useState([]);
  const [song, setsong] = useState({});
  const [user, setuser] = useState(null);

  useEffect(() => {
    console.log(tags);
  }, [tags]);

  return (
    <>
      <div className="w-screen h-screen">
        <div className="relative">
          <Topnav ontagchange={settags} />
          <Authbutton user={user} setuser={setuser} />
        </div>
        <div className="grid grid-cols-12 gap-0">
          <div className="col-span-3">
            <Leftnav ontagchange={settags} />
          </div>
          <div className="col-span-5">
            <Songlist tags={tags} onsongchange={setsong} />
          </div>
          <div className="col-span-4 flex align-middle">
            {/* <Musicplayer song={song} /> */}
            <Musicsplitter song={song} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
