import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const Mentor = () => {
  const [selectedMentor, setSelectedMentor] = useState([]);
  const [data, setData] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/mentors");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Toggle selection of mentors
  const toggleSelection = (mentor) => {
    setSelectedMentor((prev) =>
      prev.includes(mentor)
        ? prev.filter((f) => f !== mentor)
        : [...prev, mentor]
    );
  };

  // Check if all mentors are selected
  const allSelected = selectedMentor.length === data.length;

  // Handle select all toggle
  const handleSelectAll = (isChecked) => {
    setSelectedMentor(isChecked ? [...data] : []);
  };

  // Navigate to mentor details page
  const handleMentorClick = (mentor) => {
    navigate(`/opportunities/mentors/${mentor._id}`);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold">Select Mentor to change</h2>

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
          {selectedMentor.length} of {data.length} selected
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
          <span>Mentors</span>
        </label>

        {data.map((mentor, index) => (
          <label
            key={mentor._id}
            className={`flex items-center space-x-2 text-sm pl-2 pt-2 cursor-pointer text-gray-600 hover:text-black ${
              index % 2 === 0 ? "bg-gray-100 text-gray-800" : "bg-gray-200"
            }`}
          >
            <input
              type="checkbox"
              className="cursor-pointer"
              checked={selectedMentor.includes(mentor)}
              onChange={() => toggleSelection(mentor)}
            />
            <span
              className="text-blue-400"
              onClick={() => handleMentorClick(mentor)}
            >
              {mentor.name}
            </span>
          </label>
        ))}
      </div>

      {/* Add  mentors Button */}
      <div className="mt-4 flex justify-end">
        <button
          className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 cursor-pointer"
          onClick={() => navigate("/opportunities/mentors/add")}
        >
          Add Mentor
        </button>
      </div>
    </div>
  );
};

export default Mentor;
