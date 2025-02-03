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

  // Handle Input Changes (both text and file inputs)
  const handleInputChange = (e) => {
    const { name, type, files, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  // Handle Article Submission (replaces handleSave & handleSaveAndAdd)
  const handleSubmit = async (redirect = true) => {
    setIsLoading(true);

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) formDataToSend.append(key, value);
    });

    try {
      await api.post("/articles", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Article saved successfully!");

      if (redirect) {
        navigate("/opportunities/articles");
      } else {
        // Reset form for new entry
        setFormData({ title: "", content: "", link: "", thumbnail: null });
      }
    } catch (error) {
      console.error("Error saving article:", error);
      toast.error("Failed to save article. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Reusable Input Field Component
  const InputField = ({ label, name, type }) => (
    <div>
      <label className="block font-medium">{label}:</label>
      <input
        type={type}
        name={name}
        className="border p-2 w-full rounded-md"
        onChange={handleInputChange}
        {...(type !== "file" ? { value: formData[name] || "" } : {})}
      />
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Add Article</h2>

      {/* Form Fields */}
      <div className="mt-4 space-y-4">
        {[
          { label: "Title", name: "title", type: "text" },
          { label: "Content", name: "content", type: "text" },
          { label: "Link", name: "link", type: "text" },
          { label: "Photo", name: "thumbnail", type: "file" },
        ].map((field) => (
          <InputField key={field.name} {...field} />
        ))}
      </div>

      {/* Buttons */}
      <div className="mt-6 flex flex-col gap-y-1 md:flex-row justify-between">
        <div className="flex flex-col space-x-2 gap-y-1 md:flex-row">
          {[
            { name: "Save and Add Another", action: () => handleSubmit(false) },
            { name: "Save", action: () => handleSubmit(true) },
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

export default AddArticle;
