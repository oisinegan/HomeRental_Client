import Nav from "../components/nav";
import React, { useState } from "react";

function Filter() {
  const [searchRes, setSearchRes] = useState({});
  const [filterRes, setFilterRes] = useState({
    Type: "%",
    City: "%",
    County: "%",
    MinPrice: "0",
    MaxPrice: Number.MAX_SAFE_INTEGER,
    MinBedrooms: "0",
    MaxBedrooms: Number.MAX_SAFE_INTEGER,
    MinBathrooms: "0",
    MaxBathrooms: Number.MAX_SAFE_INTEGER,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilterRes((prev) => {
      return { ...prev, [name]: value.trim() };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/filterHomes", {
      method: "post",
      body: JSON.stringify(filterRes),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    setSearchRes(result);
  };

  return (
    <>
      <Nav />
      <h1>Filter</h1>
      <form onSubmit={handleSubmit}>
        <label>Property Type</label>
        <br />
        <label>
          <input
            type="radio"
            name="Type"
            value="apartment"
            onChange={handleChange}
          />
          Apartment
        </label>
        <label>
          <input
            type="radio"
            name="Type"
            value="house"
            onChange={handleChange}
          />
          House
        </label>
        <label>
          <input type="radio" name="Type" value="%" onChange={handleChange} />
          All
        </label>
        <br /> <br />
        <label>Town</label>
        <input name="City" type="text" maxLength={30} onChange={handleChange} />
        <br /> <br />
        <label>County</label>
        <input
          name="County"
          type="text"
          maxLength={30}
          onChange={handleChange}
        />
        <br /> <br />
        <label>Min Price</label>
        <input name="MinPrice" type="number" onChange={handleChange} />
        <br /> <br />
        <label>Max Price</label>
        <input name="MaxPrice" type="number" onChange={handleChange} />
        <br /> <br />
        <label>Min Bedrooms</label>
        <input name="MinBedrooms" type="number" onChange={handleChange} />
        <br /> <br />
        <label>Max Bedrooms</label>
        <input name="MaxBedrooms" type="number" onChange={handleChange} />
        <br /> <br />
        <label>Min Bathrooms</label>
        <input name="MinBathrooms" type="number" onChange={handleChange} />
        <br /> <br />
        <label>Max Bathrooms</label>
        <input name="MaxBathrooms" type="number" onChange={handleChange} />
        <br /> <br />
        <button type="submit">Submit</button>
      </form>
      <div>
        {Object.keys(searchRes).length === 0 ? (
          <p>loading....</p>
        ) : (
          <div>
            {Object.entries(searchRes).map(([index, house]) => (
              <div key={index}>
                <div>
                  {house.urls.map((images, index) => (
                    <img
                      src={images}
                      alt="Rental property images"
                      width={100}
                      height={100}
                    ></img>
                  ))}
                  {index +
                    "," +
                    house.Type +
                    "," +
                    house.Address +
                    "," +
                    house.City +
                    "," +
                    house.County +
                    "," +
                    house.Price +
                    "," +
                    house.Bedrooms +
                    "," +
                    house.Bathrooms +
                    ", POSTED BY: " +
                    house.Name +
                    ", DATE POSTED: " +
                    house.DatePosted}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Filter;
