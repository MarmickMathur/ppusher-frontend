import { useState } from "react";
import Modalform from "./modalform";

const Addsong = () => {
  const [vis, setvis] = useState(false);
  return (
    <>
      <button className="button" onClick={() => setvis(true)}>
        addsong
      </button>
      <div className=" text-black">
        <Modalform vis={vis} setvis={setvis} />
      </div>
    </>
  );
};

export default Addsong;
