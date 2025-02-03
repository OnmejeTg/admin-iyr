import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import api from "../../api/axios";

const AddMentor = () => {
  const [formData, setFormData] = useState({
    name: "",
    facebook: "",
    instagram: "",
    twitter: "",
    occupation: "",
    profileImg: null, // Change to null for file input
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    // Handle file input separately
    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0], // Store the file object
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSave = async () => {
    setIsLoading(true);

    // Use FormData to handle file uploads
    const formDataToSend = new FormData();
    for (const key in formData) {
      if (formData[key] !== null && formData[key] !== undefined) {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      await api.post(`/mentors`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type for file uploads
        },
      });
      toast.success("Mentor saved successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate("/opportunities/mentors");
    } catch (error) {
      console.error("Error saving mentor:", error);
      toast.error("Failed to save mentor. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveAndAdd = async () => {
    setIsLoading(true);

    // Use FormData to handle file uploads
    const formDataToSend = new FormData();
    for (const key in formData) {
      if (formData[key] !== null && formData[key] !== undefined) {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      await api.post(`/mentors`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type for file uploads
        },
      });
      toast.success("Funding saved successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Reset form for fresh entry
      setFormData({
        title: "",
        description: "",
        amount: "",
        applicationDeadline: "",
        applicationUrl: "",
        eligibility: "",
        profileImg: null, // Reset file input
        tags: [],
        published: false,
      });
    } catch (error) {
      console.error("Error saving funding:", error);
      toast.error("Failed to save funding. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderFormFields = () => {
    const fields = [
      { label: "Name", name: "name", type: "text" },
      { label: "Facebook", name: "facebook", type: "text" },
      { label: "Instagram", name: "instagram", type: "text" },
      { label: "Twitter", name: "twitter", type: "text" },
      { label: "Occupation", name: "occupation", type: "text" },
      { label: "Photo", name: "profileImg", type: "file" }, // Change to file input
    ];

    return fields.map(({ label, name, type }) => (
      <InputField
        key={name}
        label={label}
        name={name}
        type={type}
        value={type === "file" ? undefined : formData[name] || ""}
        onChange={handleInputChange}
      />
    ));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Add Mentor</h2>

      <div className="mt-4 space-y-4">{renderFormFields()}</div>

      {/* Buttons */}
      <div className="mt-6 flex flex-col gap-y-1 md:flex-row justify-between">
        <div className="flex flex-col space-x-2 gap-y-1 md:flex-row">
          {[
            { name: "Save and Add Another", action: handleSaveAndAdd },
            { name: "Save", action: handleSave },
          ].map(({ name, action }, i) => (
            <button
              key={i}
              className={`px-4 py-2 rounded-md ${
                i === 1 ? "bg-blue-700" : "bg-blue-500"
              } text-white`}
              onClick={action}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : name}
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
      // Don't set value for file inputs (React doesn't allow controlled file inputs)
      {...(type === "file" ? {} : { value })}
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

export default AddMentor;
