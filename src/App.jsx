import { useEffect, useState } from "react";
import Leftnav from "./components/leftnav";
import Topnav from "./components/topnav";
import Songlist from "./components/songlist";
import Musicsplitter from "./components/musicsplitter";
// import Authbutton from "./components/Login";
import { UserProvider } from "./context/user";
import axios from "axios";

function App() {
  const [tags, settags] = useState([]);
  const [song, setsong] = useState({});

  useEffect(() => {
    const getuser = async () => {
      console.log("inside get user");
      const res = await axios.get(
        "https://ppusher-backend.onrender.com/auth/google",
        {
          withCredentials: true,
        }
      );
      console.log(res);
      // console.log(res);
    };
    getuser();
  }, []);

  return (
    <>
      <UserProvider>
        <div className="w-screen h-screen">
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
              {/* <Musicplayer song={song} /> */}
              <Musicsplitter song={song} />
            </div>
          </div>
        </div>
      </UserProvider>
    </>
  );
}

export default App;
