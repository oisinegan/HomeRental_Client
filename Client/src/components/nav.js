import { Link } from "react-router-dom";
import { myContext } from "../pages/Context";
import { useContext } from "react";

function Nav() {
  const context = useContext(myContext);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "https://home-rental-client.vercel.app";
    // const response = await fetch("/logout", {
    //   method: "post",
    //   body: JSON.stringify(),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
  };

  return (
    <nav className="shadow bg-white">
      <div className="h-16 mx-auto px-5 flex items-center justify-between">
        <p className="text-2xl hover:text-cyan-500 transition-colors cursor-pointer">
          <Link to="/">HomeRental.</Link>
        </p>
        {context === "null" ? (
          <ul className="flex items-center gap-5">
            <li className="hover:text-cyan-500 transition-colors">
              <Link to="/Rentals">Rentals</Link>
            </li>
            <li className="hover:text-cyan-500 transition-colors">
              <Link to="/Login">List Rental</Link>
            </li>
          </ul>
        ) : (
          <ul className="flex items-center gap-5">
            <li className="hover:text-cyan-500 transition-colors">
              <Link to="/PostAd">List Rental</Link>
            </li>
            <li className="hover:text-cyan-500 transition-colors">
              <Link to="/MyRentals">My Rentals</Link>
            </li>

            <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
              <label className="hover:text-cyan-500 transition-colors">
                Account
              </label>
              <ul
                tabIndex="0"
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li className="hover:text-cyan-500 transition-colors">
                  <Link onClick={logout}>Log out</Link>
                </li>

                <li>
                  <Link to="/DeleteAccount" className="text-red-500">
                    Delete Account
                  </Link>
                </li>
              </ul>
            </div>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Nav;
