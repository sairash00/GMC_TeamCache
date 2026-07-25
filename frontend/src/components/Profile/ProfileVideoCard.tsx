import { Link } from "react-router-dom";
import { IoTrashOutline } from "react-icons/io5";
import axios from "axios";
import toast from "react-hot-toast";

const ProfileVideoCard = ({ video }: { video: any }) => {
  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      await axios.delete(
        `http://localhost:3000/api/video/${video._id}`,
        {
          withCredentials: true,
        }
      );

      toast.success("Video deleted.");

      window.location.reload();

    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Couldn't delete video.");
      } else {
        toast.error("Something went wrong.");
      }
    }
  };

  return (
    <Link
      to={`/video/${video._id}`}
      className="relative group bg-surface/80 backdrop-blur-2xl border border-border/30 rounded-2xl p-3 transition-all duration-300 hover:border-secondary/40 hover:bg-surface/90 hover:-translate-y-1"
    >
      {/* Delete Icon */}
      <button
        onClick={handleDelete}
        className="absolute top-5 right-5 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <IoTrashOutline
          size={22}
          className="text-text-secondary hover:text-red-400 transition"
        />
      </button>

      {/* Thumbnail */}
      <img
        src={video.thumbnail.url}
        alt={video.title}
        className="w-full aspect-video rounded-xl object-cover transition-transform duration-300 group-hover:scale-[1.03]"
      />

      {/* Info */}
      <div className="mt-3 px-1">

        <h2 className="text-text-primary font-semibold text-sm line-clamp-2">
          {video.title}
        </h2>

        <p className="mt-1 text-xs text-text-secondary">
          {video.creator}
        </p>

      </div>
    </Link>
  );
};

export default ProfileVideoCard;