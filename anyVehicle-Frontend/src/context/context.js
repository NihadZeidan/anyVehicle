import { createContext, useState } from "react";

// Creating global context
export const myContext = createContext();

// Context Provider to wrap the app with
export default function ContextProvider(props) {
  const [user, setUser] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [accessControl, setAccessControl] = useState("");

  const values = {
    user,
    setUser,
    email,
    setEmail,
    password,
    setPassword,
    userName,
    setUserName,
    accessControl,
    setAccessControl,
  };

  return (
    <myContext.Provider value={values}>{props.children}</myContext.Provider>
  );
}
