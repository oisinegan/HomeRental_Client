import { useState, useEffect, useContext } from "react";
import Nav from "../components/nav";
import Footer from "../components/footer";
import { myContext } from "../pages/Context";

function MyRentals() {
  const user = useContext(myContext);
  const [dataHouse, setDataHouse] = useState({});
  const [userInfo, setUserInfo] = useState();
  // useEffect(() => {
  //   setUserInfo(localStorage.getItem("token"));
  //   // fetch("https://homerentalserver.onrender.com/getUser")
  //   //   .then((res) => res.json())
  //   //   .then((userInfo) => {
  //   //     setUserInfo(userInfo);
  //   //   });
  // }, []);

  useEffect(() => {
    // Call the fetchData function inside the useEffect
    console.log("call 1");
    if (user && user.id) {
      console.log("call 2");
      getRentals(user.id);
      console.log("call 3");
    }
    console.log("call 4");
  }, [user]);

  useEffect(() => {}, [dataHouse]);

  const getRentals = async (id) => {
    const response = await fetch(
      "https://homerentalserver.onrender.com/getRentals",
      {
        method: "post",
        body: JSON.stringify({ id: id }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();
    setDataHouse(result);
  };

  const deleteRental = async (id) => {
    const response = await fetch(
      "https://homerentalserver.onrender.com/deleteProperty",
      {
        method: "post",
        body: JSON.stringify({ id: id }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    if (result === "SUCCESS") {
      window.location.href = "https://home-rental-client.vercel.app/MyRentals";
    } else {
      alert("ERROR");
    }
  };

  return (
    <>
      <Nav />
      <div
        className=" min-h-screen"
        style={{ minHeight: "calc(100vh - 340px)" }}
      >
        <div className="flex flex-col ">
          <div className=" ">
            <h1 className="mb-12 ml-16 text-4xl font-extrabold leading-none tracking-tight text-cyan-900 md:text-4xl lg:text-5xl dark:text-white mt-8 ml-10">
              <a href="/Rentals">
                {" "}
                <span className=" underline-offset-3 decoration-12 decoration-black dark:decoration-blue-600">
                  Your Rentals
                </span>{" "}
              </a>
            </h1>

            {/* <p className="mb-8 ml-16 text-cyan-700 ">Search results{houseNo}</p> */}
          </div>

          <div>
            {dataHouse.length === 0 ? (
              <p>loading....</p>
            ) : (
              <div className="flex showAll-custom:flex-col">
                <div className="flex flex-wrap flex-row mx-16 w-[85%] tiny-custom2:mx-0 tiny-custom2:justify-center showAll-custom2:w-full showAll-custom3:justify-center">
                  {/* INDIVID CARS */}
                  {Object.entries(dataHouse)
                    .reverse()
                    .map(([index, house]) => (
                      <div key={house.id + "_" + index}>
                        <div className="max-w-sm w-[30em] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-4">
                          <div>
                            <div className="carousel carousel-end w-[100%] rounded-t-lg">
                              {house.urls.reverse().map((images, index) => (
                                <>
                                  <div
                                    key={index}
                                    className="carousel-item w-full"
                                  >
                                    <img
                                      src={images}
                                      id={house.id + "_" + index}
                                      alt="Rental property images"
                                      className="w-full h-[20em]"
                                    />
                                  </div>
                                </>
                              ))}
                            </div>

                            <div className="flex justify-center w-full py-1 gap-1 rounded">
                              {house.urls.map((item, index) => (
                                <p
                                  key={index}
                                  className="btn btn-xs"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  {index + 1}
                                </p>
                              ))}
                            </div>
                          </div>
                          <div className="px-5 pb-5 pt-2">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                              {house.City}, {house.County}
                            </h5>

                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                              Price p/m: €{house.Price}
                            </p>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                              Type: {house.Type}
                            </p>
                            <div className="flex justify-between">
                              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                Bedrooms: {house.Bedrooms}
                              </p>
                              <button
                                value={house}
                                onClick={() => deleteRental(index)}
                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-cyan-700 rounded-lg hover:bg-cyan-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                              >
                                Delete
                                <svg
                                  className="w-3.5 h-3.5 ml-2"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 14 10"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 5h12m0 0L9 1m4 4L9 9"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MyRentals;
