import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import api from "../../api/axios";
const ConfirmArticle = () => {
  const { id } = useParams();
  const [funding, setFunding] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFunding = async () => {
      try {
        const response = await api.get(`/articles/${id}`);
        setFunding(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchFunding();
  }, [id]);

  const handleFundlingClick = (id) => {
    navigate(`/opportunities/articles/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/articles/${id}`);
      toast.success("Article deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/opportunities/articles");
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };
  return (
    <div>
      <h1 className="text-xl">Are you Sure?</h1>
      <p className="pt-4 text-md">{`Are you sure you want to delete "${
        funding?.title || "this item"
      }"? The following Item will be deleted:`}</p>
      <div>
        <p className="font-bold text-sm pt-6">Summary:</p>
        <p>
          Article:{" "}
          <span
            className="text-blue-400 cursor-pointer"
            onClick={() => handleFundlingClick(funding._id)}
          >
            {funding?.title}
          </span>
        </p>
      </div>
      <div className="pt-6">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md mr-2 cursor-pointer"
          onClick={() => handleDelete(funding._id)}
        >
          Delete
        </button>
        <button
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md cursor-pointer"
          onClick={() => navigate(`/opportunities/articles/${funding._id}`)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmArticle;
