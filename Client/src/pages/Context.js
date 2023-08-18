import { useEffect, useState, createContext } from "react";
import { decodeToken } from "react-jwt";

export const myContext = createContext();
export default function Context({ children }) {
  const [user, setUser] = useState([{}]);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const user = decodeToken(token);

      setUser(user);
      if (!user) {
        localStorage.removeItem("token");
      }
    } else {
      setUser("null");
    }

    // fetch("/getUser")
    //   .then((res) => res.json())
    //   .then((user) => {
    //     setUser(user);
    //   });
  }, []);
  return <myContext.Provider value={user}>{children}</myContext.Provider>;
}
