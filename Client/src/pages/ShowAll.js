import { useState, useEffect } from "react";
import Nav from "../components/nav";
import Footer from "../components/footer";
import { useSearchParams } from "react-router-dom";

function ShowAll() {
  const [dataHouse, setDataHouse] = useState({});
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("query");
  const querySetting = searchParams.get("key");

  const initFilterQuery = {
    Type: searchParams.get("Type"),
    City: searchParams.get("Town"),
    County: searchParams.get("County"),
    MinPrice: searchParams.get("MinPrice"),
    MaxPrice: searchParams.get("MaxPrice"),
    MinBedrooms: searchParams.get("MinBedrooms"),
    MaxBedrooms: searchParams.get("MaxBedrooms"),
    MinBathrooms: searchParams.get("MinBathrooms"),
    MaxBathrooms: searchParams.get("MaxBathrooms"),
  };

  const backupFilterQuery = {
    Type: "",
    City: "",
    County: "",
    MinPrice: "0",
    MaxPrice: Number.MAX_SAFE_INTEGER,
    MinBedrooms: "0",
    MaxBedrooms: Number.MAX_SAFE_INTEGER,
    MinBathrooms: "0",
    MaxBathrooms: Number.MAX_SAFE_INTEGER,
  };

  const resetFilter = () => {
    setFilterQuery(backupFilterQuery);
  };

  const [filterQuery, setFilterQuery] = useState(initFilterQuery);
  const [houseNo, setHouseNo] = useState(0);
  const [searchBar, setSearchbar] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;

    setSearchbar(value.trim());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchBar === "") {
      window.location.href = `/Rentals?key=${encodeURIComponent("search")}`;
    } else if (searchBar === null) {
      window.location.href = `/Rentals?key=${encodeURIComponent("search")}`;
    } else {
      window.location.href = `/Rentals?key=${encodeURIComponent(
        "search"
      )}&query=${encodeURIComponent(searchBar)}`;
    }
  };

  const handleChangeFilter = (e) => {
    const { name, value } = e.target;

    setFilterQuery((prev) => {
      return { ...prev, [name]: value.trim() };
    });
  };

  const handleSubmitFilter = async (e) => {
    e.preventDefault();

    if (filterQuery === "") {
      window.location.href = `/Rentals`;
    } else if (filterQuery === null) {
      window.location.href = `/Rentals`;
    } else {
      window.location.href = `/Rentals?key=${encodeURIComponent(
        "filter"
      )}&Type=${encodeURIComponent(filterQuery.Type)}&Town=${encodeURIComponent(
        filterQuery.City
      )}&County=${encodeURIComponent(
        filterQuery.County
      )}&MinPrice=${encodeURIComponent(
        filterQuery.MinPrice
      )}&MaxPrice=${encodeURIComponent(
        filterQuery.MaxPrice
      )}&MinBedrooms=${encodeURIComponent(
        filterQuery.MinBedrooms
      )}&MaxBedrooms=${encodeURIComponent(
        filterQuery.MaxBedrooms
      )}&MinBathrooms=${encodeURIComponent(
        filterQuery.MinBathrooms
      )}&MaxBathrooms=${encodeURIComponent(filterQuery.MaxBathrooms)}`;
    }
  };

  const fetchHouses = async () => {
    // Perform search logic based on the searchQuery
    // For example, fetch search results using the searchQuery

    if (querySetting === "search") {
      if (!searchQuery) {
        //GET ALL HOMES
        fetch("/getAllHomes")
          .then((res) => res.json())
          .then((dataHouse) => {
            console.log("Recived");
            console.log(dataHouse);
            setDataHouse(dataHouse);
            setHouseNo(": " + Object.keys(dataHouse).length);
          });
      } else {
        //GET HOMES FROM SEARCH QUERY
        const response = await fetch("/searchHomes", {
          method: "post",
          body: JSON.stringify({ search: searchQuery }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();
        setDataHouse(result);
        setSearchbar(searchQuery);
        setHouseNo(" for " + searchQuery + ": " + Object.keys(result).length);
      }
    } else if (querySetting === "filter") {
      const response = await fetch("/filterHomes", {
        method: "post",
        body: JSON.stringify(filterQuery),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      setDataHouse(result);
      setHouseNo(": " + Object.keys(result).length);
    } else {
      //GET ALL HOMES
      fetch("/getAllHomes")
        .then((res) => res.json())
        .then((dataHouse) => {
          setDataHouse(dataHouse);
          setHouseNo(": " + Object.keys(dataHouse).length);
        });
    }
  };

  const redirectToProperty = (e, key) => {
    window.location.href = `/Property?id=${encodeURIComponent(key)}`;
  };

  useEffect(() => {
    // Call the fetchData function inside the useEffect
    fetchHouses();
    // eslint-disable-next-line
  }, [searchQuery]);

  useEffect(() => {
    // Call the fetchData function inside the useEffect

    if (initFilterQuery.Type === null) {
      setFilterQuery(backupFilterQuery);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className=" flex flex-col min-h-screen">
        <Nav />
        <div
          className=" min-h-screen"
          style={{ minHeight: "calc(100vh - 370px)" }}
        >
          <div className="flex tiny-custom2:flex-col ">
            <div className="w-[70%] showAll-custom:w-[50%] ">
              <h1 className="mb-2 ml-16 text-4xl font-extrabold leading-none tracking-tight text-cyan-900 md:text-4xl lg:text-5xl dark:text-white mt-8 ml-10">
                <a href="/Rentals">
                  {" "}
                  <span className=" underline-offset-3 decoration-12 decoration-black dark:decoration-blue-600">
                    Rentals
                  </span>{" "}
                </a>
              </h1>

              <p className="mb-8 ml-16 text-cyan-700 ">
                Search results{houseNo}
              </p>
            </div>
            <form
              className="w-[30%] showAll-custom:w-[50%] tiny-custom2:w-[80%] tiny-custom2:ml-8 tiny-custom2:mt-0 mr-8 mt-10"
              onSubmit={handleSubmit}
            >
              {" "}
              {/*onSubmit={handleSubmit}> */}
              <label
                htmlFor="search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                {/*  */}
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="search"
                  // onChange={handleChange}
                  className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-0"
                  placeholder="Search a location"
                  value={searchBar}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <button
                  type="submit"
                  className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          <div>
            {dataHouse.length === 0 ? (
              <p>loading....</p>
            ) : (
              <div className="flex showAll-custom:flex-col">
                <div className="w-[15%] showAll-custom:w-auto ">
                  {/* FILTER INPUTS */}
                  <form onSubmit={handleSubmitFilter}>
                    <div className="w-full  shadow p-5 rounded-lg bg-white">
                      <div className="flex items-center justify-between mt-4 ">
                        <p className="font-medium">Filters</p>
                      </div>

                      <div>
                        <div className="flex flex-col mt-4 showAll-custom:grid xsm:grid-cols-2 md:grid-cols-3  showAll-custom:gap-4">
                          <select
                            name="Type"
                            className="px-4 py-3 mb-2 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                            value={filterQuery.Type}
                            onChange={handleChangeFilter}
                          >
                            <option value="">All Types</option>
                            <option value="apartment">Apartment</option>
                            <option value="house">House</option>
                          </select>

                          <input
                            name="City"
                            type="text"
                            placeholder="Town"
                            maxLength={30}
                            value={filterQuery.City}
                            onChange={handleChangeFilter}
                            className="px-4 py-3 mb-2 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                          />

                          <input
                            name="County"
                            type="text"
                            placeholder="County"
                            maxLength={30}
                            value={filterQuery.County}
                            onChange={handleChangeFilter}
                            className="px-4 py-3 mb-2 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                          />

                          <select
                            name="MinPrice"
                            className="px-4 py-3 mb-2 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                            value={filterQuery.MinPrice}
                            onChange={handleChangeFilter}
                          >
                            <option value="">Min Price</option>
                            <option value="250">€250</option>
                            <option value="500">€500</option>
                            <option value="750">€750</option>
                            <option value="1000">€1000</option>
                            <option value="1250">€1250</option>
                            <option value="1500">€1500</option>
                            <option value="1750">€1750</option>
                            <option value="2000">€2000</option>
                            <option value="2500">€2500</option>
                            <option value="3000">€3000</option>
                            <option value="4000">€4000</option>
                            <option value="5000">€5000</option>
                          </select>

                          <select
                            name="MaxPrice"
                            className="px-4 py-3 mb-2 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                            value={filterQuery.MaxPrice}
                            onChange={handleChangeFilter}
                          >
                            <option value="">Max Price</option>
                            <option value="250">€250</option>
                            <option value="500">€500</option>
                            <option value="750">€750</option>
                            <option value="1000">€1000</option>
                            <option value="1250">€1250</option>
                            <option value="1500">€1500</option>
                            <option value="1750">€1750</option>
                            <option value="2000">€2000</option>
                            <option value="2500">€2500</option>
                            <option value="3000">€3000</option>
                            <option value="4000">€4000</option>
                            <option value="5000">€5000</option>
                            <option value="6000">€6000</option>
                            <option value="7000">€7000</option>
                            <option value="8000">€8000</option>
                          </select>

                          <select
                            name="MinBedrooms"
                            className="px-4 py-3 mb-2 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                            value={filterQuery.MinBedrooms}
                            onChange={handleChangeFilter}
                          >
                            <option value="">Min Bedrooms</option>
                            <option value="1">1 bedroom</option>
                            <option value="2">2 bedrooms</option>
                            <option value="3">3 bedrooms</option>
                            <option value="4">4 bedrooms</option>
                            <option value="5">5 bedrooms</option>
                            <option value="6">6 bedrooms</option>
                            <option value="7">7 bedrooms</option>
                            <option value="8">8 bedrooms</option>
                          </select>

                          <select
                            name="MaxBedrooms"
                            className="px-4 py-3 mb-2 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                            value={filterQuery.MaxBedrooms}
                            onChange={handleChangeFilter}
                          >
                            <option value="">Max Bedrooms</option>
                            <option value="1">1 bedroom</option>
                            <option value="2">2 bedrooms</option>
                            <option value="3">3 bedrooms</option>
                            <option value="4">4 bedrooms</option>
                            <option value="5">5 bedrooms</option>
                            <option value="6">6 bedrooms</option>
                            <option value="7">7 bedrooms</option>
                            <option value="8">8 bedrooms</option>
                          </select>

                          <select
                            name="MinBathrooms"
                            className="px-4 py-3 mb-2 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                            value={filterQuery.MinBathrooms}
                            onChange={handleChangeFilter}
                          >
                            <option value="">Min Bathrooms</option>
                            <option value="1">1 bathroom</option>
                            <option value="2">2 bathrooms</option>
                            <option value="3">3 bathrooms</option>
                            <option value="4">4 bathrooms</option>
                            <option value="5">5 bathrooms</option>
                          </select>

                          <select
                            name="MaxBathrooms"
                            className="px-4 py-3 mb-2 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                            value={filterQuery.MaxBathrooms}
                            onChange={handleChangeFilter}
                          >
                            <option value="">Max Bathrooms</option>
                            <option value="1">1 bathroom</option>
                            <option value="2">2 bathrooms</option>
                            <option value="3">3 bathrooms</option>
                            <option value="4">4 bathrooms</option>
                            <option value="5">5 bathrooms</option>
                          </select>

                          <div className="flex justify-center mt-4">
                            <button
                              type="button"
                              onClick={resetFilter}
                              className="p-3 bg-gray-100 hover:bg-gray-200 mr-2 text-gray-800 text-sm font-medium rounded-md"
                            >
                              Reset
                            </button>
                            <button className="p-3 bg-blue-700 hover:bg-blue-800  text-white text-sm font-medium rounded-md">
                              Search
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="flex flex-wrap flex-row mx-4 w-[85%] showAll-custom2:w-full showAll-custom3:justify-center">
                  {/* INDIVID CARS */}
                  {Object.entries(dataHouse)
                    .reverse()
                    .map(([index, house]) => (
                      <div key={house.id + "_" + index}>
                        <div className="max-w-sm w-[30em]  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-4 flex flex-col justify-center">
                          <div>
                            <div className="carousel carousel-end w-[100%] rounded-t-lg ">
                              {house.urls.reverse().map((images, index) => (
                                <>
                                  <div
                                    key={index}
                                    className="carousel-item w-full "
                                  >
                                    <img
                                      src={images}
                                      id={house.id + "_" + index}
                                      alt="Rental property images"
                                      className="w-[100%] h-[20em]"
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
                                onClick={(e) => redirectToProperty(e, index)}
                                value={house}
                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-cyan-700 rounded-lg hover:bg-cyan-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                              >
                                More info
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
        <Footer />
      </div>
    </>
  );
}

export default ShowAll;
