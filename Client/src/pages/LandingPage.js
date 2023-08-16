import { useState } from "react";
import Nav from "../components/nav";
import Footer from "../components/footer";
import LandingPageImg from "../Images/LandingPageImg.jpg";
import CorkPopArea from "../Images/CorkPopArea.jpeg";
import CorkPopularArea from "../Images/CorkPopularArea.jpeg";
import DubPopularArea from "../Images/DubPopularArea.jpeg";
import React from "react";

function LandingPage() {
  const initialFilterState = {
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

  const [filterRes, setFilterRes] = useState(initialFilterState);

  const divStyle = {
    backgroundImage: `url(${LandingPageImg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "40em",
  };

  const popArea1 = {
    backgroundImage: `url(${DubPopularArea})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "30em",
  };

  const popArea2 = {
    backgroundImage: `url(${CorkPopularArea})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "30em",
  };

  const popArea3 = {
    backgroundImage: `url(${CorkPopArea})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "30em",
  };

  const searchPopArea = (e) => {
    window.location.href = `https://home-rental-client.vercel.app/Rentals?key=${encodeURIComponent(
      "search"
    )}&query=${encodeURIComponent(e.target.value)}`;
  };

  const [search, setSearch] = useState(null);

  const handleChange = (e) => {
    const { value } = e.target;

    setSearch(value.trim());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (search === "") {
      window.location.href = `https://home-rental-client.vercel.app/Rentals?key=${encodeURIComponent(
        "search"
      )}`;
    } else if (search === null) {
      window.location.href = `https://home-rental-client.vercel.app/Rentals?key=${encodeURIComponent(
        "search"
      )}`;
    } else {
      window.location.href = `https://home-rental-client.vercel.app/Rentals?key=${encodeURIComponent(
        "search"
      )}&query=${encodeURIComponent(search)}`;
    }
  };
  const handleChangeFilter = (e) => {
    const { name, value } = e.target;

    setFilterRes((prev) => {
      return { ...prev, [name]: value.trim() };
    });
  };

  const handleSubmitFilter = async (e) => {
    e.preventDefault();

    if (filterRes === "") {
      window.location.href = `https://home-rental-client.vercel.app/Rentals`;
    } else if (filterRes === null) {
      window.location.href = `https://home-rental-client.vercel.app/Rentals`;
    } else {
      window.location.href = `https://home-rental-client.vercel.app/Rentals?key=${encodeURIComponent(
        "filter"
      )}&Type=${encodeURIComponent(filterRes.Type)}&Town=${encodeURIComponent(
        filterRes.City
      )}&County=${encodeURIComponent(
        filterRes.County
      )}&MinPrice=${encodeURIComponent(
        filterRes.MinPrice
      )}&MaxPrice=${encodeURIComponent(
        filterRes.MaxPrice
      )}&MinBedrooms=${encodeURIComponent(
        filterRes.MinBedrooms
      )}&MaxBedrooms=${encodeURIComponent(
        filterRes.MaxBedrooms
      )}&MinBathrooms=${encodeURIComponent(
        filterRes.MinBathrooms
      )}&MaxBathrooms=${encodeURIComponent(filterRes.MaxBathrooms)}`;
    }
  };

  const resetFilter = () => {
    setFilterRes(initialFilterState);
  };

  return (
    <>
      <Nav />

      {/* SEARCH/ IMAGE */}
      <div style={divStyle} className="flex items-center justify-center h-full">
        <form className="w-3/5 m-auto" onSubmit={handleSubmit}>
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
              onChange={handleChange}
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-0"
              placeholder="Search a location"
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
      {/* FILTER INPUTS */}
      <form onSubmit={handleSubmitFilter}>
        <div className="w-full  shadow p-5 rounded-lg bg-white">
          <div className="flex items-center justify-between mt-4">
            <p className="font-medium">Filters</p>

            <div>
              <button
                type="button"
                onClick={resetFilter}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 mr-2 text-gray-800 text-sm font-medium rounded-md"
              >
                Reset Filters
              </button>
              <button className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium rounded-md">
                {" "}
                Search{" "}
              </button>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
              <select
                name="Type"
                className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                onChange={handleChangeFilter}
                value={filterRes.Type}
              >
                <option value="%">All Types</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
              </select>

              <input
                name="City"
                type="text"
                placeholder="Town"
                maxLength={30}
                value={filterRes.City}
                className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                onChange={handleChangeFilter}
              />

              <input
                name="County"
                type="text"
                value={filterRes.County}
                placeholder="County"
                maxLength={30}
                className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                onChange={handleChangeFilter}
              />

              <select
                name="MinPrice"
                className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                onChange={handleChangeFilter}
                value={filterRes.MinPrice}
              >
                <option value="0">Min Price</option>
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
                className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                onChange={handleChangeFilter}
                value={filterRes.MaxPrice}
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
                className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                onChange={handleChangeFilter}
                value={filterRes.MinBedrooms}
              >
                <option value="0">Min Bedrooms</option>
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
                className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                onChange={handleChangeFilter}
                value={filterRes.MaxBedrooms}
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
                className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                onChange={handleChangeFilter}
                value={filterRes.MinBathrooms}
              >
                <option value="0">Min Bathrooms</option>
                <option value="1">1 bathroom</option>
                <option value="2">2 bathrooms</option>
                <option value="3">3 bathrooms</option>
                <option value="4">4 bathrooms</option>
                <option value="5">5 bathrooms</option>
              </select>

              <select
                name="MaxBathrooms"
                className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                onChange={handleChangeFilter}
                value={filterRes.MaxBathrooms}
              >
                <option value="">Max Bathrooms</option>
                <option value="1">1 bathroom</option>
                <option value="2">2 bathrooms</option>
                <option value="3">3 bathrooms</option>
                <option value="4">4 bathrooms</option>
                <option value="5">5 bathrooms</option>
              </select>
            </div>
          </div>
        </div>
      </form>
      {/* Popular properties */}
      <div>
        {/* url(${LandingPageImg}) */}
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white mt-8 ml-10">
          <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
            Trending
          </span>{" "}
          areas
        </h1>
        <div className="flex flex-wrap flex-row  tiny-custom:mx-0 sml-custom:flex-col xl-custom:mx-40 justify-between content-center mx-20 my-10 ">
          <div
            style={popArea1}
            className="flex items-center flex-col justify-center w-[525px] tiny-custom:w-full   transition-all duration-300 rounded-lg cursor-pointer filter grayscale hover:grayscale-0 relative group my-4 "
          >
            <p className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl dark:text-white">
              Dublin
            </p>
            <button
              value="Dublin"
              className="invisible group-hover:visible bg-white hover:bg-blue-500 text-blue font-semibold py-1 px-2 rounded-full"
              onClick={searchPopArea}
            >
              See properties
            </button>
          </div>
          <div
            style={popArea2}
            className="flex items-center  flex-col justify-center w-[525px] tiny-custom:w-full transition-all duration-300 rounded-lg cursor-pointer filter grayscale hover:grayscale-0 group my-4"
          >
            <h2 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl dark:text-white">
              Cork
            </h2>
            <button
              value="Cork"
              onClick={searchPopArea}
              className="invisible group-hover:visible bg-white hover:bg-blue-500 text-blue font-semibold py-1 px-2 rounded-full"
            >
              See properties
            </button>
          </div>
          <div
            style={popArea3}
            className="flex items-center  flex-col justify-center w-[525px] tiny-custom:w-full transition-all duration-300 rounded-lg cursor-pointer filter grayscale hover:grayscale-0 group my-4"
          >
            <h2 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl dark:text-white">
              Waterford
            </h2>
            <button
              value="Waterford"
              onClick={searchPopArea}
              className="invisible group-hover:visible bg-white hover:bg-blue-500 text-blue font-semibold py-1 px-2 rounded-full"
            >
              See properties
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LandingPage;
