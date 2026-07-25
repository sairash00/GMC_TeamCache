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
    } catch (error:any) {
      toast.error(error?.message);
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
    } catch (error:any) {
      toast.error(error.message);
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


  return (
    <div className="relative flex gap-4 rounded-2xl bg-surface/80 backdrop-blur-2xl border border-border/30 p-5 transition-all duration-300 hover:border-secondary/40 hover:bg-surface/90">
      {isOwner && (
        <button
          onClick={handleDelete}
          className="absolute top-3 right-3 text-red-400 hover:text-red-500 transition"
        >
          <FaTrash size={15} />
        </button>
      )}

      {/* Votes */}
<div className="flex flex-col items-center justify-center gap-2 min-w-12 rounded-xl bg-surface/80 backdrop-blur-xl border border-border/30 px-2 py-3">
        <button
          onClick={handleUpvote}
          disabled={voted || loading}
          className={`text-lg hover:text-green-300 transition ${voted || loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <FaArrowUp size={18} />
        </button>

        <span className="text-lg font-semibold text-text-primary">
          {votes}
        </span>

        <button
          onClick={handleDownvote}
          disabled={voted || loading}
          className={`text-lg hover:text-red-300 transition ${voted || loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <FaArrowDown size={18} />
        </button>
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-text-primary font-semibold text-xl line-clamp-2">
          {request.title}
        </h3>

        <p className="mt-1 text-base text-text-secondary">
          Requested by{" "}
          <span className="font-medium text-text-primary">
            {request.requestedBy.name}
          </span>
        </p>

        <p className="mt-2 text-sm text-text-secondary line-clamp-2">
          {request.description}
        </p>

        {request.tags && request.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {request.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-sm font-medium text-secondary bg-secondary/10 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillRequestCard;