function Footer() {
  return (
    <footer className="bg-gray-100 rounded-lg mt-24  ">
      <hr className=" border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div className="w-full max-w-screen-xl mx-auto p-4">
        <div className=" flex justify-between">
          <a href="http://localhost:3000">
            <p className="text-2xl hover:text-cyan-500 transition-colors cursor-pointer">
              HomeRental.
            </p>
          </a>
          <div>
            <ul className="flex flex-wrap items-center tiny-custom:flex-col text-sm font-medium text-gray-500  dark:text-gray-400   mr-4 mt-1.5">
              <li>
                <a
                  href="http://localhost:3000/Rentals"
                  className="mr-4  hover:text-cyan-500 transition-colors md:mr-6"
                >
                  View properties
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/OisinEgan/"
                  className=" hover:text-cyan-500 transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <a href="http://localhost:3000" className="hover:underline">
            HomeRental™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
