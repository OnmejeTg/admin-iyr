import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import api from "../../api/axios";

const FundingDetails = () => {
  const { id } = useParams();
  const [funding, setFunding] = useState(null);
  const [image, setImage] = useState("11116335ia.jpg");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFunding = async () => {
      try {
        const response = await api.get(`/fundings/${id}`);
        setFunding(response.data.data);
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
    navigate(`/opportunities/fundings/delete/${id}`);
  };

  if (!funding) return <p>Loading...</p>;
  // console.log(funding);

  const handleSave = async () => {
    try {
      // Send a PUT or PATCH request to update the funding
      const response = await api.put(`/fundings/${funding._id}`, funding);

      toast.success("Funding saved successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      navigate("/opportunities/fundings");
    } catch (error) {
      console.error("Error saving funding:", error);
      alert("Failed to save funding. Please try again.");
    }
  };

  const handleSaveAndAdd = async () => {
    try {
      // Save the current funding
      const response = await api.put(`/fundings/${funding._id}`, funding);
      // console.log("Funding saved successfully:", response.data);

      // Show success toast
      toast.success("Funding saved successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate("/opportunities/fundings/add");
    } catch (error) {
      console.error("Error saving funding:", error);

      // Show error toast
      toast.error("Failed to save funding. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  const handleSaveAndEdit = async () => {};
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
      <h2 className="text-xl font-semibold mb-4">Change Funding</h2>
      <p className="font-bold text-lg">{funding.title}</p>

      <div className="mt-4 space-y-4">
        {[
          { label: "Title", name: "title", type: "text" },
          { label: "Description", name: "description", type: "text" },
          { label: "Amount", name: "amount", type: "text" },
          {
            label: "Application Deadline",
            name: "applicationDeadline",
            type: "date",
          },
          { label: "Application URL", name: "applicationUrl", type: "text" },
          { label: "Eligibility", name: "eligibility", type: "text" },
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
              src={funding.photo || image}
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
            {/* <label
              htmlFor="fileInput"
              style={{
                display: "block",
                textAlign: "center",
                padding: "10px",
                backgroundColor: "#007bff",
                color: "#fff",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Choose File
            </label> */}
          </div>
        </div>
        {/* Tags Select */}
        <div>
          <label className="block font-medium">Tags:</label>
          <select
            name="tags"
            value={funding.tags || ""}
            onChange={handleInputChange}
            className="border p-2 w-full rounded-md"
          >
            {funding.tags?.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>

        {/* Is Published Checkbox */}
        <CheckboxField
          label="Is Published"
          name="published"
          checked={funding.published || false}
          onChange={handleInputChange}
        />
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
            // { name: "Save and Continue Editing", action: handleSaveAndEdit },
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

// Reusable Checkbox Component
const CheckboxField = ({ label, name, checked, onChange }) => (
  <div className="flex items-center">
    <input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
      className="mr-2"
    />
    <label className="font-medium">{label}</label>
  </div>
);

export default FundingDetails;
