import { useEffect, useState, createContext } from "react";

export const myContext = createContext();
export default function Context({ children }) {
  const [user, setUser] = useState([{}]);
  useEffect(() => {
    fetch("https://homerentalserver.onrender.com/getUser")
      .then((res) => res.json())
      .then((user) => {
        setUser(user);
      });
  }, []);
  return <myContext.Provider value={user}>{children}</myContext.Provider>;
}
