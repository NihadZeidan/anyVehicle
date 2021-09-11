import React, { createContext, useState } from "react";

// Creating global context
export const myContext = createContext();

// Context Provider to wrap the app with
export default function ContextProvider(props) {
  // To handle user Login and Register
  const [user, setUser] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [accessControl, setAccessControl] = useState("");

  // To handle all user request
  const [userRequests, setUserRequests] = useState([]);
  const [reqTitle, setReqTitle] = useState("");
  const [reqDescription, setReqDescription] = useState("");
  const [urgent, setUrgent] = useState(false);
  const [userLocation, setUserLocation] = useState("");
  const [carModel, setCarModel] = useState("");

  // To handle user request status and all-Requests
  const [newStatus, setNewStatus] = useState({});
  const [allRequests, setAllRequests] = useState([]);

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
    userRequests,
    setUserRequests,
    reqTitle,
    setReqTitle,
    reqDescription,
    setReqDescription,
    urgent,
    setUrgent,
    userLocation,
    setUserLocation,
    carModel,
    setCarModel,
    newStatus,
    setNewStatus,
    allRequests,
    setAllRequests,
  };

  return (
    <myContext.Provider value={values}>{props.children}</myContext.Provider>
  );
}
