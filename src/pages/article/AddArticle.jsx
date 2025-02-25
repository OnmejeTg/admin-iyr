import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import api from "../../api/axios";

const AddArticle = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    link: "",
    thumbnail: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const saveArticle = async (resetForm = false) => {
    setIsLoading(true);
    const formDataToSend = new FormData();

    // Append all fields including the file
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formDataToSend.append(key, value);
      }
    });

    // Log form data for debugging
    console.log("FormData contents:");
    for (const [key, value] of formDataToSend.entries()) {
      console.log(key, value);
    }

    try {
      // Removed manual Content-Type header
      await api.post("/articles", formDataToSend);

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
        {
          autoClose: 5000,
        }
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
