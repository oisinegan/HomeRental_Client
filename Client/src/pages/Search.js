import { useState } from "react";
import Nav from "../components/nav";
function Search() {
  const [search, setSearch] = useState([]);
  const [searchRes, setSearchRes] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSearch((prev) => {
      return { ...prev, [name]: value.trim() };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "https://homerentalserver.onrender.com/searchHomes",
      {
        method: "post",
        body: JSON.stringify(search),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();
    setSearchRes(result);
  };

  return (
    <>
      <Nav />
      <h1>Search</h1>
      <form onSubmit={handleSubmit}>
        <br />

        <input
          name="search"
          type="text"
          maxLength={40}
          onChange={handleChange}
        />
        <button type="submit">Seach</button>
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
                      alt="House rental images"
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

export default Search;
