import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const Funding = () => {
  const [selectedFunding, setSelectedFunding] = useState([]);
  const [data, setData] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/fundings");
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Toggle selection of fundings
  const toggleSelection = (funding) => {
    setSelectedFunding((prev) =>
      prev.includes(funding)
        ? prev.filter((f) => f !== funding)
        : [...prev, funding]
    );
  };

  // Check if all fundings are selected
  const allSelected = selectedFunding.length === data.length;

  // Handle select all toggle
  const handleSelectAll = (isChecked) => {
    setSelectedFunding(isChecked ? [...data] : []);
  };

  // Navigate to funding details page
  const handleFundingClick = (funding) => {
    navigate(`/opportunities/fundings/${funding._id}`);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold">Select Funding to change</h2>

      {/* Action Dropdown */}
      <div className="mt-4 flex items-center space-x-2">
        <label className="text-sm font-medium">Action:</label>
        <select className="border rounded-md px-2 py-1">
          <option value="">----------</option>
          <option value="delete">Delete</option>
        </select>
        <button className="bg-gray-700 text-white px-3 py-1 rounded-md hover:bg-gray-800 cursor-pointer">
          Go
        </button>
        <span className="text-sm text-gray-600">
          {selectedFunding.length} of {data.length} selected
        </span>
      </div>

      {/* Checkbox List */}
      <div className="mt-4 pt-2 bg-white p-4 shadow">
        <label className="flex pl-2 items-center space-x-2 font-semibold cursor-pointer text-gray-800">
          <input
            type="checkbox"
            className="cursor-pointer"
            onChange={(e) => handleSelectAll(e.target.checked)}
            checked={allSelected}
          />
          <span>Funding Opportunities</span>
        </label>

        {data.map((funding, index) => (
          <label
            key={funding._id}
            className={`flex items-center space-x-2 text-sm pl-2 pt-2 cursor-pointer text-gray-600 hover:text-black ${
              index % 2 === 0 ? "bg-gray-100 text-gray-800" : "bg-gray-200"
            }`}
          >
            <input
              type="checkbox"
              className="cursor-pointer"
              checked={selectedFunding.includes(funding)}
              onChange={() => toggleSelection(funding)}
            />
            <span
              className="text-blue-400"
              onClick={() => handleFundingClick(funding)}
            >
              {funding.title}
            </span>
          </label>
        ))}
      </div>

      {/* Add Portal Fundings Button */}
      <div className="mt-4 flex justify-end">
        <button
          className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 cursor-pointer"
          onClick={() => navigate("/opportunities/fundings/add")}
        >
          Add Funding Opportunity
        </button>
      </div>
    </div>
  );
};

export default Funding;
