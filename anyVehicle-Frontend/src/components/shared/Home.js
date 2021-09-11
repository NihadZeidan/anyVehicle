// my context
import React, { useContext } from "react";
import { myContext } from "../../context/context";

function Home() {
  const { user } = useContext(myContext);
  return (
    <div>
      <p>Welcome {user.userNAme}</p>
    </div>
  );
}

export default Home;
