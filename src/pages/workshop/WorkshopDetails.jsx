import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import api from "../../api/axios";

const WorkshopDetails = () => {
  const { id } = useParams();
  const [funding, setFunding] = useState(null);
  const [image, setImage] = useState("11116335ia.jpg");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFunding = async () => {
      try {
        const response = await api.get(`/workshops/${id}`);

        setFunding(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchFunding();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFunding((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDelete = async (id) => {
    navigate(`/opportunities/workshops/delete/${id}`);
  };

  if (!funding) return <p>Loading...</p>;
  // console.log(funding);

  const handleSave = async () => {
    try {
      // Send a PUT or PATCH request to update the funding
      const response = await api.put(`/workshops/${funding._id}`, funding);

      toast.success("Workshop saved successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      navigate("/opportunities/workshops");
    } catch (error) {
      console.error("Error saving workshop:", error);
      alert("Failed to save workshop. Please try again.");
    }
  };

  const handleSaveAndAdd = async () => {
    try {
      // Save the current funding
      const response = await api.put(`/workshops/${funding._id}`, funding);
      // console.log("Funding saved successfully:", response.data);

      // Show success toast
      toast.success("Workshop saved successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate("/opportunities/workshops/add");
    } catch (error) {
      console.error("Error saving workshop:", error);

      // Show error toast
      toast.error("Failed to save workshop. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Change Worskhop</h2>
      <p className="font-bold text-lg">{funding?.tagline}</p>

      <div className="mt-4 space-y-4">
        {[
          { label: "Tagline", name: "tagline", type: "text" },
          { label: "Link", name: "link", type: "text" },
          // { label: "Photo", name: "thumbnail", type: "file" },
        ].map(({ label, name, type }) => (
          <InputField
            key={name}
            label={label}
            name={name}
            type={type}
            value={funding[name] || ""}
            onChange={handleInputChange}
          />
        ))}
        <div
          style={{
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            width: "300px",
          }}
        >
          <div style={{ marginBottom: "10px" }}>
            <img
              src={funding.thumbnail || image}
              alt="Current"
              style={{ width: "100%", borderRadius: "5px" }}
            />
          </div>
          <div>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex flex-col gap-y-1 md:flex-row justify-between ">
        <button
          className="bg-red-600 text-white px-4 py-2 rounded-md"
          onClick={() => handleDelete(funding._id)}
        >
          Delete
        </button>
        <div className="flex flex-col space-x-2 gap-y-1 md:flex-row">
          {[
            { name: "Save and Add Another", action: handleSaveAndAdd },

            { name: "Save", action: handleSave },
          ].map(({ name, action }, i) => (
            <button
              key={i}
              className={`px-4 py-2 rounded-md ${
                i === 2 ? "bg-blue-700" : "bg-blue-500"
              } text-white`}
              onClick={() => action()}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Reusable Input Field Component
const InputField = ({ label, name, type, value, onChange }) => (
  <div>
    <label className="block font-medium">{label}:</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="border p-2 w-full rounded-md"
    />
  </div>
);

export default WorkshopDetails;
