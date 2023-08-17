import Nav from "../components/nav";
import Footer from "../components/footer";
import React, { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import storage from "../config/firebase";

function PostAd() {
  const [userInfo, setUserInfo] = useState();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadedFilesImgURl, setUploadedFilesImgUrl] = useState([]);
  const [fileLimit, setFileLimit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const MAX_IMAGES = 6;

  const [formRes, setFormRes] = useState({
    Type: "apartment",
    City: "",
    County: "",
    Address: "",
    Price: "0",
    Bedrooms: "0",
    Bathrooms: "0",
    Description: "",
    idLandlord: "",
    urls: "",
    DatePosted: "",
    Folder: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormRes((prev) => {
      return { ...prev, [name]: value.trim() };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    let milli = date_ob.getMilliseconds();

    let fullDate =
      hours +
      ":" +
      minutes +
      ":" +
      seconds +
      ":" +
      milli +
      "__" +
      date +
      "-" +
      month +
      "-" +
      year;

    const folder = formRes.idLandlord + "_" + fullDate;
    formRes.Folder = folder;
    formRes.DatePosted = date + "-" + month + "-" + year;

    const fbUrls = [];
    const uploadPromises = uploadedFiles.map(async (img) => {
      const imageRef = ref(storage, folder + "/" + img.name);
      await uploadBytes(imageRef, img);
      const imageUrl = await getDownloadURL(imageRef);

      fbUrls.push(imageUrl);
    });
    formRes.urls = fbUrls;
    await Promise.all(uploadPromises);

    await sendForm();
  };

  const sendForm = async () => {
    const response = await fetch(
      "https://homerentalserver.onrender.com/PostAd",
      {
        method: "post",
        body: JSON.stringify(formRes),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();

    setIsSubmitting(false);
    if (result === "RECEIVED") {
      window.location.href = "https://home-rental-client.vercel.app/MyRentals";
    } else {
      alert("ERROR POSTING AD PLEASE TRY AGAIN");
    }
  };

  const configImages = async (files) => {
    const urls = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const objectURL = URL.createObjectURL(file);
      urls.push(objectURL);
    }
    setUploadedFilesImgUrl(urls);
  };
  const handleUploadFiles = (files) => {
    const uploaded = [...uploadedFiles];
    let limitExceeded = false;

    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
        if (uploaded.length === MAX_IMAGES) {
          alert("YOU CAN ONLY ADD " + (MAX_IMAGES - 1) + " images");
          setFileLimit(false);
          limitExceeded = true;
          return true;
        }
      }
      return false;
    });
    if (!limitExceeded) {
      setUploadedFiles(uploaded);
      configImages(uploaded);
    }
  };

  const handleFileEvent = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleUploadFiles(chosenFiles);
  };

  const deleteImage = (e) => {
    e.preventDefault();
    setUploadedFiles([]);
    setUploadedFilesImgUrl([]);
  };

  useEffect(() => {}, [uploadedFiles]);

  useEffect(() => {
    setUserInfo(localStorage.getItem("token"));
    setFormRes((prevFormRes) => ({
      ...prevFormRes,
      idLandlord: userInfo.id,
    }));
  }, []);

  return (
    <>
      <Nav />

      <h1 className="mb-12 ml-16 text-4xl font-extrabold leading-none tracking-tight text-cyan-900 md:text-4xl lg:text-5xl dark:text-white mt-8 ml-10">
        <span className=" underline-offset-3 decoration-12 decoration-black dark:decoration-blue-600">
          List Property
        </span>
      </h1>
      <h1> </h1>
      <form
        className="mx-[20%]"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="mb-6">
          <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
            Property Type
          </label>
          <select
            id="countries"
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
          </select>
        </div>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          >
            Address
          </label>
          <input
            name="Address"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            maxLength={30}
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          >
            Town
          </label>
          <input
            name="City"
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            maxLength={30}
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          >
            County
          </label>
          <input
            name="County"
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            maxLength={30}
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          >
            Price per month
          </label>
          <input
            name="Price"
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          >
            Bed
          </label>
          <input
            name="Bedrooms"
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          >
            Bathrooms
          </label>
          <input
            name="Bathrooms"
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="Description"
            className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <textarea
            name="Description"
            rows="6"
            maxLength={2000}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onChange={handleChange}
          />
        </div>

        <div className="mb-6 flex flex-col justify-center">
          <label
            htmlFor="images"
            className="block mb-1 text-lg font-medium text-gray-900 dark:text-white"
          >
            {" "}
            Choose Images{" "}
          </label>

          <input
            name="file"
            type="file"
            required
            onChange={handleFileEvent}
            multiple
            disabled={fileLimit}
            className="hidden-input"
          />
          {/* <a
            href="/Register"
            className="font-semibold leading-6 text-cyan-600 hover:text-cyan-500"
          >
            Sign up now
          </a> */}

          {/* <img height={150} width={150} src={imagePre} /> */}
          <div className="uploaded-files-list mx-[20%] ">
            {uploadedFilesImgURl.map((file) => (
              <div>
                <img
                  className="h-[25em] showAll-custom3:h-[20em] showAll-custom4:h-[17em] tiny-custom2:h-[15em] tiny-custom:h-[12.5em] w-full my-4 border-2 border-black"
                  alt="House rental images"
                  src={file}
                />
              </div>
            ))}
          </div>
          <button
            className="font-semibold leading-6 text-cyan-600 hover:text-cyan-500"
            onClick={deleteImage}
          >
            Not Happy with your images? Click here to reset!
          </button>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className={`px-4 py-2 ${
              isSubmitting ? "bg-blue-700" : "bg-blue-700 hover:bg-blue-800"
            } text-white text-sm font-medium rounded-md justify-end`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Post Property"}
          </button>
        </div>
      </form>
      <Footer />
    </>
  );
}

export default PostAd;
