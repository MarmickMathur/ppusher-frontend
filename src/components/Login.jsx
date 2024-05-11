import { useContext } from "react";
import { UserContext } from "../context/user";

const Authbutton = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const gauth = async () => {
    console.log(currentUser);
    if (!currentUser) {
      window.location.href = "https://ppusher-backend.onrender.com/auth/google";
      // console.log(res);
      // setuser(res);
    }
  };

  return (
    <>
      <button className="button" onClick={gauth}>
        hello
      </button>
    </>
  );
};

export default Authbutton;
