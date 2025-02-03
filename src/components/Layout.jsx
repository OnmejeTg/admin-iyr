import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="layout">
      <header className="bg-green-800 text-white p-4 lg:flex justify-between items-center">
        <h1 className="text-center ml-4">BIzGrowth Admin</h1>
        <div className="text-center lg:flex items-center">
          <span className="mr-1">Welcome, Admin</span>
          <button className="ml-auto text-white px-4 py-2 rounded-md bg-green-800 hover:bg-green-700">
            View Site
          </button>
          <button className="ml-auto text-white px-4 py-2 rounded-md bg-green-800 hover:bg-green-700">
            Logout
          </button>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
