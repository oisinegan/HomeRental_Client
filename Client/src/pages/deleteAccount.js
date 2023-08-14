import Nav from "../components/nav";
import Footer from "../components/footer";
import React, { useState, useEffect } from "react";

function Filter() {
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    fetch("/getUser")
      .then((res) => res.json())
      .then((userInfo) => {
        setUserInfo(userInfo);
      });
  }, []);

  const goBack = (e) => {
    e.preventDefault();
    window.location.href = "http://localhost:3000";
  };

  const logout = async (e) => {
    e.preventDefault();
    const response = await fetch("/logout", {
      method: "post",
      body: JSON.stringify(),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    if (result === "LOGGED OUT") {
      deleteAcc();
    }
  };

  const deleteAcc = async () => {
    const response = await fetch("/deleteAccount", {
      method: "post",
      body: JSON.stringify({ id: userInfo.id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    if (result === "SUCCESS") {
      window.location.href = "http://localhost:3000";
    }
  };
  return (
    <>
      <Nav />
      <div
        className="w-full items-center flex justify-center min-h-screen"
        style={{ minHeight: "calc(100vh - 340px)" }}
      >
        <div className="flex flex-col justify-center w-full mx-4 max-w-4xl md:h-56 bg-white rounded-lg shadow-lg overflow-hidden md:flex-row my-10">
          <div className="md:flex items-center justify-center md:w-1/2 md:bg-gray-700">
            <div className="py-6 px-8 md:py-0">
              <h2 className="text-gray-700 text-2xl font-bold md:text-gray-100">
                Are you sure you want to delete your account?
              </h2>
              <p className="mt-2 text-gray-600 md:text-gray-400">
                All of your listed rentals will be deleted and your data will
                not be able to be retrieved.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center pb-6 md:py-0 md:w-1/2 md:border-b-8 border-gray-700">
            <form>
              <div className="flex flex-col rounded-lg overflow-hidden sm:flex-row">
                <div>
                  <button
                    className="text-white text-lg p-4 m-2 cursor-pointer bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold3 rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={logout}
                    aria-label="Delete Account"
                  >
                    Yes, Delete Account
                  </button>
                </div>
                <div>
                  <button
                    className="text-white text-lg p-4 m-2 cursor-pointer  bg-gray-600 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold3 rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={goBack}
                    aria-label="Go Back"
                  >
                    No, Go Back
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Filter;
