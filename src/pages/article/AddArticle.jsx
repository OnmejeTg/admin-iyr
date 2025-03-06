import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import api from "../../api/axios";

const AddArticle = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    link: "",
    thumbnail: null, // Ensure file input is handled properly
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;

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

  const saveArticle = async (resetForm = false) => {
    setIsLoading(true);
    const formDataToSend = new FormData();

    for (const key in formData) {
      if (formData[key] !== null && formData[key] !== undefined) {
        formDataToSend.append(key, formData[key]);
      }
    }

    console.log("FormData contents:");
    for (const [key, value] of formDataToSend.entries()) {
      console.log(key, value);
    }

    try {
      await api.post("/articles", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Article saved successfully!", { autoClose: 3000 });

      if (resetForm) {
        setFormData({ title: "", content: "", link: "", thumbnail: null });
        document.querySelector("input[type='file']").value = ""; // Reset file input
      } else {
        navigate("/opportunities/articles");
      }
    } catch (error) {
      console.error("Error saving article:", error);
      toast.error(
        `Failed to save article: ${
          error.response?.data?.message || error.message
        }`,
        { autoClose: 5000 }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Add Article</h2>

      <div className="mt-4 space-y-4">
        {[
          { label: "Title", name: "title", type: "text", required: true },
          { label: "Content", name: "content", type: "text", required: true },
          { label: "Link", name: "link", type: "text" },
          { label: "Photo", name: "thumbnail", type: "file", required: true },
        ].map((field) => (
          <InputField
            key={field.name}
            {...field}
            value={field.type !== "file" ? formData[field.name] : undefined}
            onChange={handleInputChange}
          />
        ))}
      </div>

      <div className="mt-6 flex flex-col md:flex-row justify-between space-y-2 md:space-y-0">
        {[
          { name: "Save and Add Another", action: () => saveArticle(true) },
          { name: "Save", action: () => saveArticle(false) },
        ].map(({ name, action }, i) => (
          <button
            key={i}
            className={`px-4 py-2 rounded-md text-white transition ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : i === 1
                ? "bg-blue-700 hover:bg-blue-800"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            onClick={action}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : name}
          </button>
        ))}
      </div>
    </div>
  );
};

const InputField = ({ label, name, type, value, onChange, required }) => (
  <div>
    <label className="block font-medium">
      {label}:{required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <input
      type={type}
      name={name}
      onChange={onChange}
      className="border p-2 w-full rounded-md"
      {...(type === "file" ? {} : { value })}
      required={required}
    />
  </div>
);

export default AddArticle;

