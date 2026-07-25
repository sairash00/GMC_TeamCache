import { useEffect, useState } from "react";
import { FaArrowUp, FaArrowDown, FaTrash } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";

const SkillRequestCard = ({ request }: any) => {
  const [votes, setVotes] = useState(request.upvotes - request.downvotes);
  const [voted, setVoted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    if (
      storedUser._id &&
      storedUser._id === request.requestedBy._id
    ) {
      setIsOwner(true);
    }
  }, [request]);

  const handleUpvote = async () => {
    if (voted || loading) return;

    try {
      setLoading(true);

      await axios.patch(
        `http://localhost:3000/api/skill-request/${request._id}/upvote`,
        {},
        {
          withCredentials: true,
        }
      );

      setVotes((prev) => prev + 1);
      setVoted(true);
    } catch (error) {
      toast.error("Failed to upvote");
    } finally {
      setLoading(false);
    }
  };

  const handleDownvote = async () => {
    if (voted || loading) return;

    try {
      setLoading(true);

      await axios.patch(
        `http://localhost:3000/api/skill-request/${request._id}/downvote`,
        {},
        {
          withCredentials: true,
        }
      );

      setVotes((prev) => prev - 1);
      setVoted(true);
    } catch (error) {
      toast.error("Failed to downvote");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/skill-request/${request._id}`,
      {
        withCredentials: true,
      }
    );

    toast.success(
      response.data.message || "Skill request deleted successfully."
    );

    window.location.reload();
  } catch (error: any) {
    toast.error(
      error.response?.data?.message ||
        "Failed to delete skill request."
    );
  }
};
  console.log(request);

  return (
    <div className="relative flex gap-4 rounded-xl bg-slate-800 hover:bg-slate-600 transition-all duration-300 p-4">
      {isOwner && (
        <button
          onClick={handleDelete}
          className="absolute top-3 right-3 text-red-400 hover:text-red-500 transition"
        >
          <FaTrash size={15} />
        </button>
      )}

      {/* Votes */}

      <div className="flex flex-col items-center justify-center gap-2 min-w-12 rounded-lg bg-accent px-2 py-3">
        <button
          onClick={handleUpvote}
          disabled={voted || loading}
          className={`text-white hover:text-green-300 transition ${
            voted || loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <FaArrowUp size={14} />
        </button>

        <span className="text-white font-bold text-sm">{votes}</span>

        <button
          onClick={handleDownvote}
          disabled={voted || loading}
          className={`text-white hover:text-red-300 transition ${
            voted || loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <FaArrowDown size={14} />
        </button>
      </div>

      {/* Content */}

      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <img
            src={
              request.requestedBy.avatar.url ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            }
            alt={request.user}
            className="w-9 h-9 rounded-full object-cover"
          />

          <span className="text-sm text-gray-300">
            {request.requestedBy.name}
          </span>
        </div>

        <h2 className="text-white font-semibold text-lg">
          {request.title}
        </h2>

        <p className="text-gray-300 text-sm mt-1 line-clamp-3">
          {request.description}
        </p>
      </div>
    </div>
  );
};

export default SkillRequestCard;