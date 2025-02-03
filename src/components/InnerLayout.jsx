import { Link, Outlet, useNavigate } from "react-router-dom";

const links = [
  { id: 1, text: "Funding", path: "opportunities/fundings" },
  { id: 2, text: "Mentors", path: "opportunities/mentors" },
  { id: 3, text: "Workshops", path: "opportunities/workshops" },
  { id: 4, text: "Article", path: "opportunities/articles" },
];

const InnerLayout = () => {
  const navigate = useNavigate();
  return (
    <div className="h-[100%] min-h-screen flex">
      {/* Sidebar Navigation */}
      <nav className="w-1/4 bg-green-600 text-white p-4">
        <h2 className="text-lg font-semibold mb-4">Admin Dashboard</h2>
        <ul>
          {links.map((link) => (
            <li
              key={link.id}
              className={`flex justify-between items-center p-2 ${
                link.id % 2 === 0
                  ? "bg-green-100 text-gray-800"
                  : "bg-green-200 text-gray-800"
              }`}
            >
              <Link to={`/${link.path}`} className="hover:text-green-900">
                {link.text}
              </Link>
              <button
                className="text-green-300 font-extrabold text-2xl px-2 cursor-pointer"
                onClick={() => navigate(`/${link.path}/add`)}
              >
                +
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <main className="w-3/4 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default InnerLayout;
