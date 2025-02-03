import React from "react";
import { Link } from "react-router-dom";

const links = [
  {
    id: 1,
    text: "Funding",
    path: "opportunities/fundings",
  },
  {
    id: 2,
    text: "Mentors",
    path: "opportunities/mentors",
  },
  {
    id: 3,
    text: "Workshops",
    path: "opportunities/workshops",
  },
  {
    id: 4,
    text: "Article",
    path: "opportunities/articles",
  },
];

const Home = () => {
  return (
    <section>
      <h1 className="text-3xl font-light">Site Administration</h1>
      <p className="mt-2 bg-green-400 text-white rounded-sm pl-2 max-w-xl">
        Opportunities
      </p>
      <div>
        {links.map((link) => (
          <div
            className={`flex justify-between max-w-xl px-2  items-center mt-2  ${
              link.id % 2 === 0 ? "bg-gray-200 rounded-sm" : ""
            }`}
            key={link.id}
          >
            <Link
              to={`/${link.path}`}
              className={`block mt-2 text-sm   hover:text-green-900`}
            >
              {link.text}
            </Link>
            <button className="hover:cursor-pointer">
              {" "}
              <span className="font-extrabold text-2xl px-2 text-green-300">
                +
              </span>
              Add
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Home;
