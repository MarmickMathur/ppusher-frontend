import axios from "axios";

const Authbutton = ({ setuser, user }) => {
  const gauth = async () => {
    console.log("hello");
    console.log(user);
    if (!user) {
      window.location.href = "http://localhost:8000/auth/google";
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
